import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  public locationRegisterClicked: boolean = false; //Whatever you want to initialise it as
  public locationEditClicked: boolean = false; //Whatever you want to initialise it as
  public addVehicleClicked: boolean = false; //Whatever you want to initialise it as


  public locationRegisterClick() {

      this.locationRegisterClicked = !this.locationRegisterClicked;
  }

  public locationEditClick() {

      this.locationEditClicked = !this.locationEditClicked;
  }

  public addVehicleClick() {

      this.addVehicleClicked = !this.addVehicleClicked;
  }

}
