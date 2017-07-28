import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImeiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-imei',
  templateUrl: 'imei.html',
})
export class ImeiPage {
  
  public ImeiEditClicked: boolean = false; //Whatever you want to initialise it as

    public ImeiEditClick() {

        this.ImeiEditClicked = !this.ImeiEditClicked;
    }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImeiPage');
  }

}
