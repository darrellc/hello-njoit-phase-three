import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { ShareService } from '../pages/services/ShareService';
import { HelperMethods } from '../pages/services/HelperMethods';

@Component({
  templateUrl: 'app.html',
  providers: [ShareService, HelperMethods]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      setTimeout(function(){
        Splashscreen.hide();
      }, 3000);
    });
  }
}
