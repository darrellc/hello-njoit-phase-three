import { Injectable } from "@angular/core";
import { NavController, AlertController } from 'ionic-angular';
import { ShareService } from '../services/ShareService';

import { Http, Headers } from '@angular/http';

@Injectable()
export class HelperMethods{   

    constructor(public http: Http, public sService: ShareService){}

    showCheckbox(alertCtrl){
        console.log("Creating Checkbox");
        let alert = alertCtrl.create();
        alert.setMessage("Select dates you would like to display.");

        alert.addInput({
            type: 'checkbox',
            label: 'State Holidays',            
            value: 'show-holidays',
            id: "show-holidays",
            checked: this.sService.getShow('show-holidays')
        });

        alert.addInput({
            type: 'checkbox',
            label: 'Pay Dates',            
            value: 'show-pay',
            id: "show-pay",
            checked: this.sService.getShow('show-pay')
        });

        alert.addInput({
            type: 'checkbox',
            label: 'ECATS Due Dates',
            value: 'show-due',
            id: "show-due",
            checked: this.sService.getShow('show-due')
        });

        alert.addButton({
            text: "Cancel",
            role: 'cancel'
        });
        alert.addButton({
            text: 'Accept',
            handler: data => {                
                this.sService.updateScreen.next(data);
            }
        });
        alert.present();

    } 

    getEvents(){        
        this.http.get('assets/resources/holidays.json', new Headers())
            .map(res => res.json())
            .subscribe( res => {                

                var holidays = res;                
                
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
                        currentEvent.date = new Date(currentEvent.date.setDate(currentEvent.date.getDate() + 7));                    
                        if(currentEvent.type === "due-dates"){
                            currentEvent.type = "pay-dates";
                        }else{
                            currentEvent.type = "due-dates";
                        }                        
                    }
                }
                for (let h of holidays){
                    
                    var m = h.date.split(" ")[1];
                    m = m.toLowerCase();
                    
                    //Create a date object for the holiday
                    var holidayDate = new Date();
                    //Set the holidayDate month to the month in the loop
                    holidayDate.setMonth(this.sService.getMonthNames().indexOf(m));
                    holidayDate.setDate(parseInt(h.dateNum, 10));

                    this.createEvent({
                        date: holidayDate,
                        type: "holidays",
                        holiday: h.holiday
                    });

                }
            }
                        
        );
    }
    createEvent(event){
        var newEvent = {};
        //Get the daye number 
        var day = event.date.getDate();        
        var month = {
            num: event.date.getMonth(),
            name: this.sService.getMonth(event.date.getMonth())
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

        this.sService.addEvent(month.name, event.type, newEvent);

        
    }    

}

