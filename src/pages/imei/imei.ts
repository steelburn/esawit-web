import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';

import { BaseHttpService } from '../../services/base-http';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Driver } from '../../models/driver';
import { User } from '../../models/user';
import { UserIMEI } from '../../models/user';
import { Get_IMEI } from '../../models/imei';
import { UserIMEI_HISTORY } from '../../models/user';


import { ImeiService } from '../../services/imeiservice';


import { FormControlDirective, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-imei',
  templateUrl: 'imei.html', providers: [BaseHttpService, ImeiService]
})
export class ImeiPage {

  ImeiUserform: FormGroup; Imeiuser_entry: Get_IMEI = new Get_IMEI();
  public users: User[] = [];
  public user_imeis: UserIMEI[] = [];
  public user_imei_histories: Get_IMEI[] = [];
  public get_imeibyid_histories: UserIMEI_HISTORY[] = [];

  Active_Deactive_Imei: Get_IMEI = new Get_IMEI();
  UserImeiHistory_entry: UserIMEI_HISTORY = new UserIMEI_HISTORY();

  current_Imei_GUID: string = '';
  current_user_IMEI: string = '';
  current_Imei_active: number;


  public ImeiEditClicked: boolean = false; //Whatever you want to initialise it as
  public ImeiEditClick(data) {
    //alert(JSON.stringify(data));
    this.current_Imei_GUID = data.Imei_GUID;
    this.current_user_IMEI = data.user_IMEI;
    this.current_Imei_active = data.active;
    this.get_UserList();
    this.ImeiEditClicked = !this.ImeiEditClicked;
  }
  public ImeiEditClose() {
    this.ImeiEditClicked = !this.ImeiEditClicked;
  }

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private httpService: BaseHttpService,
    private imei_service: ImeiService) {
    this.get_imeis();
    this.ImeiUserform = fb.group
      ({
        formuser_GUID: '',
        formmodule_id: ''

      });
  }

  AssignUser() {
    alert(this.Imeiuser_entry.module_id);
    //  this.Imeiuser_entry.user_GUID = this.Imeiuser_entry.user_GUID;
    //  this.Imeiuser_entry.module_id = this.Imeiuser_entry.module_id;
    this.Imeiuser_entry.Imei_GUID = this.current_Imei_GUID;
    this.Imeiuser_entry.user_IMEI = this.current_user_IMEI;
    this.Imeiuser_entry.active = this.current_Imei_active;
    alert(JSON.stringify(this.Imeiuser_entry));
    var self = this;
    this.imei_service.AssginUser_Imei(this.Imeiuser_entry)
      .subscribe((response) => {
        this.get_imeis();
      })

    this.ImeiEditClose();
    this.get_UserList();
  }

  get_imeis() {
    let self = this;
    let params: URLSearchParams = new URLSearchParams();
    //params.set('order', 'last_name+ASC');
    self.imei_service.getImei2(params)
      .subscribe((user_imeis: UserIMEI[]) => {
        self.user_imeis = user_imeis;
        this.fillTop_imeiHistory();

      });
  }

  fillTop_imeiHistory() {
    var last_element = this.user_imeis[0];
    if (last_element.user_IMEI != "") {
      let self = this;
      let params: URLSearchParams = new URLSearchParams();
      self.imei_service.Get_IMEI_History(last_element.user_IMEI, params)
        .subscribe((user_imei_histories: Get_IMEI[]) => {
          self.user_imei_histories = user_imei_histories;
          this.fillPrevious_imeiHistory(last_element.user_IMEI);
        });
    }
  }

  View(index:number) {
    alert(index);
    var last_element = this.user_imeis[index];
    if (last_element.user_IMEI != "") {
      let self = this;
      let params: URLSearchParams = new URLSearchParams();
      self.imei_service.Get_IMEI_History(last_element.user_IMEI, params)
        .subscribe((user_imei_histories: Get_IMEI[]) => {
          self.user_imei_histories = user_imei_histories;
          this.fillPrevious_imeiHistory(last_element.user_IMEI);
        });
    }
  }

  fillPrevious_imeiHistory(str_user_IMEI: string) {
    if (str_user_IMEI != "") {
      let self = this;
      let params: URLSearchParams = new URLSearchParams();
      self.imei_service.Get_IMEI_History3(str_user_IMEI, params)
        .subscribe((get_imeibyid_histories: UserIMEI_HISTORY[]) => {
          //console.log(user_imei_histories); 
          self.get_imeibyid_histories = get_imeibyid_histories;

        });
    }
  }


  Deactive_imei(data) {
    alert(JSON.stringify(data));
    if (data.active == 0 || data.active == null || data.active == 2) {
      this.Active_Deactive_Imei.active = 1;
    }
    if (data.active != 0) {
      this.Active_Deactive_Imei.active = 0;
    }

    this.Active_Deactive_Imei.user_IMEI = data.user_IMEI;
    this.Active_Deactive_Imei.module_id = data.module_id;
    this.Active_Deactive_Imei.user_GUID = data.user_GUID;
    this.Active_Deactive_Imei.Imei_GUID = data.Imei_GUID;
    this.Active_Deactive_Imei.created_ts = data.created_ts;
    this.Active_Deactive_Imei.updated_ts = null;

    var self = this;
    this.imei_service.Deactive_Imei(this.Active_Deactive_Imei)
      .subscribe((response) => {
        this.get_imeis();
      })

  }

  Save_ImeiHistory(data) {
    this.UserImeiHistory_entry.user_IMEI = data.user_IMEI;
    this.UserImeiHistory_entry.user_GUID = data.user_GUID;
    this.UserImeiHistory_entry.fullname = data.fullname;
    this.UserImeiHistory_entry.Created_Date = null;

    this.imei_service.save_ImeiHistory(this.UserImeiHistory_entry)
      .subscribe((response) => {
        console.log(response);
        if (response.status == 200) {
          this.RemoveUser(data)
        }

      })
  }

  RemoveUser(data) {
    //alert(JSON.stringify(data));

    // this.Active_Deactive_Imei.active = 2;
    this.Active_Deactive_Imei.user_IMEI = data.user_IMEI;
    this.Active_Deactive_Imei.module_id = null;
    this.Active_Deactive_Imei.user_GUID = "";
    this.Active_Deactive_Imei.Imei_GUID = data.Imei_GUID;
    this.Active_Deactive_Imei.created_ts = data.created_ts;
    this.Active_Deactive_Imei.updated_ts = null;
    var self = this;
    this.imei_service.Deactive_Imei(this.Active_Deactive_Imei)
      .subscribe((response) => {
        this.get_imeis();
      })

  }

  get_UserList() {
    let self = this;
    let params: URLSearchParams = new URLSearchParams();
    //params.set('order', 'last_name+ASC');
    self.imei_service.getall_users(params)
      .subscribe((users: User[]) => {
        self.users = users;

      });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ImeiPage');
  }

}
