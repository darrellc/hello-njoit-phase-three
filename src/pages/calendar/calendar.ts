import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ShareService } from '../services/ShareService';

import { CalendarViewPage } from '../calendar-view/calendar-view';

/*
  Generated class for the Calendar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.html'
})
export class CalendarPage {

    eventSource;
    calendars: any[];
    shareService: ShareService;
    navigator: NavController;

    constructor(public navCtrl: NavController, public navParams: NavParams, private sService: ShareService) {
        this.calendars = [];   
        this.shareService = sService; 
        this.navigator = navCtrl;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CalendarPage');
        var calendar = this;
        setTimeout(function(){
          calendar.createCalendars();
        }, 200);
        
    }

    createCalendars(){
        //Create an array of Rows for the calendar
        var calendarRow = [];    
        //Get the holidays array of objects in the ShareService.
        for(let month of this.shareService.getMonthNames()){ 
            //Get the index of the month name in the array.  To create the correct month calendar.
            var monthIdx = this.shareService.getMonthNames().indexOf(month);
            //Create a UTC start date of the 1st of every month in the current year
            var startDate = new Date(new Date().getFullYear(),monthIdx,1);
            //Create a calendar object with the month mode,
            //The currentDate being the first date of each month,
            //The monthName being the name of that month,
            //The events [] being the list of holidays for that month.
            calendarRow.push({
                mode: 'month',
                currentDate: startDate,
                monthName: month,
                events: this.shareService.getEvents(month, monthIdx)
            });      

            if(monthIdx % 3 === 2 && monthIdx !== 0){
                this.calendars.push(calendarRow);
                calendarRow = [];
            }

        }
    } 

    openCal(calendar){
        console.log("Calling openCal");
        console.log("With params calendar");

        this.navigator.push(CalendarViewPage, {
            cal: calendar
        })
    }

}
