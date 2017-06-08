import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
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
    loading;       

    constructor(public navCtrl: NavController, public http: Http, public sService: ShareService, public alertCtrl: AlertController, public helper: HelperMethods, public loadingCtrl: LoadingController) {
        //Create events list
        this.helper.getEvents();

        this.sService.updateScreen.subscribe(data => {
            this.showEvents(data);
        });

        this.monthNames = this.sService.getMonthNames();
        this.monthEvents = this.sService.getEvents();        
    }    

    presentCheckbox(){
        this.helper.showCheckbox(this.alertCtrl);
    }

    showEvents(data){
        for(var show in this.sService.getShowObject()){
            if(data.indexOf(show) !== -1){
                this.sService.setShow(show, true);
            }else{
                this.sService.setShow(show, false);
            }
        }
    }

    createLoader(){
        this.loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
    }

    showLoader(){
        this.loading.present();
    }

}
