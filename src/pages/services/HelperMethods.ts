import { AlertController } from 'ionic-angular';
import { ShareService } from '../services/ShareService';


export class HelperMethods{
    constructor(public alertCtrl: AlertController, public sService: ShareService){}

    showCheckbox(){
        console.log("Creating Checkbox");
        let alert = this.alertCtrl.create();
        alert.setMessage("Select dates you would like to display.");

        alert.addInput({
            type: 'checkbox',
            label: 'State Holidays',            
            value: 'show-holidays',
            id: "show-holidays",
            checked: this.sService.getShowHolidays()
        });

        alert.addInput({
            type: 'checkbox',
            label: 'Pay Dates',            
            value: 'show-pay',
            id: "show-pay",
            checked: this.sService.getShowPayDates()
        });

        alert.addInput({
            type: 'checkbox',
            label: 'ECATS Due Dates',
            value: 'show-due',
            id: "show-due",
            checked: this.sService.getShowDueDates()
        });

        alert.addButton({
            text: "Cancel",
            role: 'cancel'
        });
        alert.addButton({
            text: 'Accept',
            handler: data => {
                console.log('Checkbox data:', data);
                //Check the index of each checkbox. If found set the instance variable which corresponds.
                this.sService.setShowHolidays((data.indexOf("show-holidays") !== -1) ? true : false);
                this.sService.setShowPayDates((data.indexOf("show-pay") !== -1) ? true : false);
                this.sService.setShowDueDates((data.indexOf("show-due") !== -1) ? true : false);
            }
        });
        alert.present();

    }   
}

