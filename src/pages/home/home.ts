import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';

import { ShareService } from '../services/ShareService';

import { HelperMethods } from '../services/HelperMethods';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
    holidays: any[];
    monthEvents: {};
    monthNames: any[];
    shareService: ShareService;
    hm: HelperMethods;
    

    constructor(public navCtrl: NavController, public http: Http, private sService: ShareService, public alertCtrl: AlertController) {        
        this.monthEvents = {};
        this.getEvents();
        this.shareService = sService;
        this.shareService.setDates(this.monthEvents);
        
        this.hm = new HelperMethods(alertCtrl, this.shareService);
    }
        
    getEvents(){        
        this.http.get('assets/resources/holidays.json', new Headers())
            .map(res => res.json())
            .subscribe( res => {                

                this.holidays = res;                
                
                //1st Date 1/5/2017
                var currentEvent = {
                    date: new Date(new Date().getFullYear(), 0, 5),
                    type: "due-dates"
                }
                
                while(1){
                    //Exit the while loop if the year has changed
                    if(currentEvent.date.getFullYear() !== new Date().getFullYear()){
                        break;
                    }else{

                        //Recursively call a function that flip flops 
                        //between pay date and due date every 7 days.

                        this.createEvent(currentEvent);    
                        var nextDate = new Date(currentEvent.date.setDate(currentEvent.date.getDate() + 7));                    
                        if(currentEvent.type === "due-dates"){
                            currentEvent.type = "pay-dates";
                        }else{
                            currentEvent.type = "due-dates";
                        }                        
                    }
                }  

                console.log("Month events", this.monthEvents);          
                for (let h of this.holidays){
                    
                    var m = h.date.split(" ")[1];
                    var now = new Date();
                    
                    //Create a date object for the holiday
                    var holidayDate = new Date();
                    //Set the holidayDate month to the month in the loop
                    holidayDate.setMonth(this.shareService.getMonthNames().indexOf(m));
                    holidayDate.setDate(parseInt(h.dateNum, 10));

                    this.createEvent({
                        date: holidayDate,
                        type: "holidays",
                        holiday: h.holiday
                    });

                }
                
                this.monthNames = Object.keys(this.monthEvents);
            }
        );
    }

    createEvent(event){
        var newEvent = {};
        //Get the daye number 
        var day = event.date.getDate();        
        var month = {
            num: event.date.getMonth(),
            name: this.shareService.getMonth(event.date.getMonth())
        };
        //DUE DATE
        //Get the sTime of the due date
        var sTime = new Date(Date.UTC(event.date.getFullYear(),month.num,day));
        var eTime = new Date(Date.UTC(event.date.getFullYear(),month.num, day+1));                    

        switch(event.type){
            case "due-dates":
                newEvent["title"] = "ECATS Due Date";
                newEvent["eventType"] = "monthview-due-date";
                break;
            case "pay-dates":
                newEvent["title"] = "Pay Date";
                newEvent["eventType"] = "monthview-pay-date";
                break;
            case "holidays":
                newEvent["title"] = event.holiday;
                newEvent["eventType"] = "monthview-holiday";
                break;
        }

        newEvent["startTime"] = sTime;
        newEvent["endTime"] = eTime;
        newEvent["allDay"] = true;
        newEvent["dateAnno"] = (month.num+1) + "/" + day + "/" + event.date.getFullYear();        

        if (!(month.name in this.monthEvents)) {
            this.monthEvents[month.name] = {};
        }
        
        if(!this.monthEvents[month.name][event.type]){
            this.monthEvents[month.name][event.type] = [newEvent];
        }else{
            this.monthEvents[month.name][event.type].push(newEvent);
        }        
    }

    presentCheckbox(){
        this.hm.showCheckbox();
    }

}
