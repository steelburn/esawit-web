import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VehiclePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html',
})
export class VehiclePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiclePage');
  }

  public vehicleRegisterClicked: boolean = false; //Whatever you want to initialise it as
  public vehicleEditClicked: boolean = false; //Whatever you want to initialise it as
  public addLocationClicked: boolean = false; //Whatever you want to initialise it as

  public vehicleRegisterClick() {

    this.vehicleRegisterClicked = !this.vehicleRegisterClicked;
  }

  public vehicleEditClick() {

    this.vehicleEditClicked = !this.vehicleEditClicked;
  }

  public addLocationClick() {

    this.addLocationClicked = !this.addLocationClicked;
  }
}
