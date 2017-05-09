import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { ShareService } from '../services/ShareService';
import { HelperMethods } from '../services/HelperMethods';

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

    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public sService: ShareService, 
                public helper: HelperMethods, 
                public alertCtrl: AlertController, 
                public loadingCtrl: LoadingController) {

        this.presentLoading();

        this.calendars = [];   
        this.navigator = navCtrl;

        this.sService.updateScreen.subscribe(data => {
            this.showEvents(data);
        });
    }

    ionViewDidLoad() {
        this.calendars = [];
        var calendar = this;
        setTimeout(function(){
          calendar.createCalendars();
        }, 200);
        
    }

    createCalendars(){        
        //Create an array of Rows for the calendar
        var calendarRow = [];    
        //Get the holidays array of objects in the ShareService.
        for(let month of this.sService.getMonthNames()){ 
            //Get the index of the month name in the array.  To create the correct month calendar.
            var monthIdx = this.sService.getMonthNames().indexOf(month);
            //Create a UTC start date of the 1st of every month in the current year
            var startDate = new Date(new Date().getFullYear(),monthIdx,1);
            //Create a calendar object with the month mode,
            //The currentDate being the first date of each month,
            //The monthName being the name of that month,
            //The events [] being the list of holidays for that month.
            var events = this.sService.getMonthEvents(month);
            calendarRow.push({
                mode: 'month',
                currentDate: startDate,
                monthName: month,
                events: events
            });      

            if(monthIdx % 3 === 2 && monthIdx !== 0){
                this.calendars.push(calendarRow);
                calendarRow = [];
            }

        }        
        this.dismissLoading();        
    } 

    openCal(calendar){
        console.log("Calling openCal");
        console.log("With params calendar");

        this.navigator.push(CalendarViewPage, {
            cal: calendar
        })
    }

    presentCheckbox(){
        this.helper.showCheckbox(this.alertCtrl);
    }

    showEvents(data){        
        this.presentLoading();
        var cp = this;
        setTimeout(function(){
            for(var show in cp.sService.getShowObject()){
                if(data.indexOf(show) !== -1){
                    cp.sService.setShow(show, true);
                }else{
                    cp.sService.setShow(show, false);
                }
            }        
            cp.calendars = [];
            cp.createCalendars(); 
        }, 200);
        
    }

    presentLoading(){
        this.createLoading();
        this.sService.loader.present();
    }

    createLoading(){
        this.sService.setLoader(this.loadingCtrl.create({
            content: 'Please wait...'
        }));
    }

    dismissLoading(){
        this.sService.loader.dismiss();        
    }

}
