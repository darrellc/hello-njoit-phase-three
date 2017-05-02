import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';

import { ShareService } from '../services/ShareService';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
    holidays: any[];
    holidaysToMonths: {};
    monthKeys: any[];
    shareService: ShareService;
    

    constructor(public navCtrl: NavController, public http: Http, private sService: ShareService) {        
        this.holidaysToMonths = {};
        this.getHolidays();
        this.shareService = sService;
        this.shareService.setHolidays(this.holidaysToMonths);
    }
        
    getHolidays(){        
        this.http.get('assets/resources/holidays.json', new Headers())
            .map(res => res.json())
            .subscribe( res => {
            this.holidays = res;                
            
            for (let h of this.holidays){
                //Loop through months 
                for (let m of this.shareService.getMonthNames()){                        
                    var idx = h.date.indexOf(m);                        
                    if(idx !== -1){
                        //Something was found
                        //Create a date object for now
                        var now = new Date();
                        //Create a date object for the holiday
                        var holidayDate = new Date();
                        //Set the holidayDate month to the month in the loop
                        holidayDate.setMonth(this.shareService.getMonthNames().indexOf(m));
                        holidayDate.setDate(parseInt(h.dateNum, 10));
                        
                        //Compare the two dates. If the holiday has passed then set disabled to true.
                        if(holidayDate < now){ h.disabled = true; }else{ h.disabled = false; }
                        
                        
                        //Check if holidaysToMonths has key m (month)
                        if (!(m in this.holidaysToMonths)) {
                            //Create a new entry in the holidaysToMonths object
                            this.holidaysToMonths[m] = [h];
                        }else{
                            this.holidaysToMonths[m].push(h);
                        }
                    }
                }
            }
            this.monthKeys = Object.keys(this.holidaysToMonths);
        });
    }

}
