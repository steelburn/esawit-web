import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the RolePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-role',
  templateUrl: 'role.html',
})
export class RolePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolePage');
  }

  public roleRegisterClicked: boolean = false; //Whatever you want to initialise it as
  public roleEditClicked: boolean = false; //Whatever you want to initialise it as
  public addUserClicked: boolean = false; //Whatever you want to initialise it as

  public roleRegisterClick() {

    this.roleRegisterClicked = !this.roleRegisterClicked;
  }

  public roleEditClick() {

    this.roleEditClicked = !this.roleEditClicked;
  }

  public addUserClick() {

    this.addUserClicked = !this.addUserClicked;
  }

}
