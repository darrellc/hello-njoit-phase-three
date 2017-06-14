import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ShareService } from '../services/ShareService';

import { HelperMethods } from '../services/HelperMethods';
/*
  Generated class for the CalendarView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-calendar-view',
    templateUrl: 'calendar-view.html'
})
export class CalendarViewPage {

    calendar = {
        mode: 'month',
        currentDate: new Date(),
        monthName: "",
        events: []
    };
    shareService: ShareService;
    currentMonth: number;
    monthNames: any[];
    
    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                private sService: ShareService, 
                public helper: HelperMethods,
                public alertCtrl: AlertController) {

        this.calendar.monthName = navParams.get("cal").monthName;
        this.calendar.events = navParams.get("cal").events;
        this.calendar.currentDate = navParams.get("cal").currentDate;
        this.currentMonth = navParams.get("cal").currentDate.getMonth();
        this.shareService = sService;

        this.sService.updateScreen.subscribe(data => {
            this.showEvents(data);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CalendarViewPage');   
    }

    changeMonth(direction){    
        console.log("BEFORE: ", this.currentMonth);
        //Get the current month
        switch(direction){
          case "back":
            if(this.currentMonth !== 0){
              console.log("I can go back a month.");
              //Subtract a month.  Go back to the previous month.
              this.currentMonth--;
            }else{
              return;
            }
            break;
          case "forward":
            if(this.currentMonth < 11){
              //Add a month.  Go forward to the next month.
              this.currentMonth++;
            }else{
              return;
            }
            break;
        }
        //Get month name;    
        console.log("AFTER: ", this.currentMonth);
        this.calendar.monthName = this.shareService.getMonth(this.currentMonth);
        this.calendar.currentDate = new Date(this.calendar.currentDate.setMonth(this.currentMonth));
        return this.calendar;
    }

    onRangeChanged() {
        console.log("onRangeChanged trigger");
    }

    onCurrentDateChanged(event: Date){
        console.log("onCurrentDateChanged triggered");

        //Get the currentMonth name and idx        
        this.calendar.events = this.shareService.getMonthEvents(this.calendar.monthName);
    }

    showEvents(data){        
        var cp = this;
        setTimeout(function(){
            for(var show in cp.sService.getShowObject()){
                if(data.indexOf(show) !== -1){
                    cp.shareService.setShow(show, true);
                }else{
                    cp.shareService.setShow(show, false);
                }
            }
            cp.shareService.getMonthEvents(cp.calendar.monthName); 
        }, 200);
    }

    presentCheckbox(){
        this.helper.showCheckbox(this.alertCtrl);
    }
}
