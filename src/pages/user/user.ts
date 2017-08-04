import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';

import { DriverService } from '../../services/driverservice2';
import { UserService } from '../../services/userservice';

import { BaseHttpService } from '../../services/base-http';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Driver } from '../../models/driver';
import { User } from '../../models/user';
import { USER_LOCATION_MODEL } from '../../models/user';
import { USER_LOCATION_ENTRY } from '../../models/user';

import { LocationModel } from '../../models/location';

import { UserIMEI } from '../../models/user';

import { GETVEHICLE } from '../../models/driver';
import { VEHICLEDRIVER_MODEL } from '../../models/vehicle';

import { GETDRIVER_CHART } from '../../models/driver';


import { FormControlDirective, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';

@IonicPage()
@Component({

    selector: 'page-user',

    templateUrl: 'user.html', providers: [UserService, BaseHttpService, DriverService]

})
export class UserPage {

    public current_user_GUID: string = '';
    public getlocations: LocationModel[] = [];
    public get_selectlocations: USER_LOCATION_MODEL[] = [];
    user_location: USER_LOCATION_ENTRY = new USER_LOCATION_ENTRY();


    public userRegisterClicked: boolean = false; //Whatever you want to initialise it as
    public userEditClicked: boolean = false; //Whatever you want to initialise it as
    public addLocationClicked: boolean = false; //Whatever you want to initialise it as

    current_userGUID: string = ''; current_tenantGUID: string = ''; current_ActiveUser: number;

    public addLocationClick() {
        this.addLocationClicked = !this.addLocationClicked;
    }
    public userRegisterClick() {
        this.userRegisterClicked = !this.userRegisterClicked;
    }
    public userEditClick() {

        this.userEditClicked = !this.userEditClicked;
    }
    Userform: FormGroup; user_entry: User = new User();
    UserEditform: FormGroup; user_entry_edit: User = new User();

    user: User = new User();
    public users: User[] = [];

    Active_Deactive_user: User = new User();


    @ViewChild('driverDoughnutCanvas') driverDoughnutCanvas;
    driverDoughnutChart: any;


    public drivercharts: GETDRIVER_CHART[] = [];


    constructor(private fb: FormBuilder, @Inject(FormBuilder) fb2: FormBuilder, private userservice: UserService, private driverservice: DriverService,
        private httpService: BaseHttpService, public navCtrl: NavController, public navParams: NavParams) {
        this.GenerateToken();
        this.getList();

        this.UserEditform = fb.group
            ({
                fullname: '',
                userID: '',
                email: '',
                address1: '',
                address2: '',
                password: '',
                active: ''
            });

        this.Userform = fb2.group
            ({
                fullname: '',
                userID: '',
                email: '',
                address1: '',
                address2: '',
                password: '',
                active: ''
            });

        this.fillChart_items();
    }

    Deactive_user(data) {

        if (data.active == 0 || data.active == null) {
            this.Active_Deactive_user.active = 1;
        }
        if (data.active == 1) {
            this.Active_Deactive_user.active = 0;
        }
        this.Active_Deactive_user.userID = data.userID;
        this.Active_Deactive_user.user_GUID = data.user_GUID;
        this.Active_Deactive_user.tenant_GUID = data.tenant_GUID;
        this.Active_Deactive_user.fullname = data.fullname;

        this.Active_Deactive_user.email = data.email;
        this.Active_Deactive_user.address1 = data.address1;
        this.Active_Deactive_user.address2 = data.address2;
        this.Active_Deactive_user.password = data.password;

        this.Active_Deactive_user.created_ts = data.created_ts;
        this.Active_Deactive_user.createdby_GUID = data.createdby_GUID;
        this.Active_Deactive_user.updated_ts = data.updated_ts;
        this.Active_Deactive_user.updatedby_GUID = data.updatedby_GUID;

        var self = this;
        this.userservice.Deactive_User(this.Active_Deactive_user)
            .subscribe((response) => {
                console.log(response);
            })

    }

    save() {
        if (this.Userform.valid) {
            //alert(this.Userform.value['active']);

            if (this.Userform.value['active'] == true) {
                this.user_entry.active = 1;
            } else { this.user_entry.active = 0; }
            this.user_entry.user_GUID = UUID.UUID();
            this.user_entry.tenant_GUID = UUID.UUID();
            //this.register();

            var self = this;
            this.userservice.save(this.user_entry)
                .subscribe((response) => {
                    if (response.status == 200) {
                        var self = this;
                    }

                })

            alert("User " + this.Userform.value['fullname'] + " has been successfully registered!");
            this.Userform.reset();
            this.userRegisterClick();
            this.getList();
        }
    }

    register() {
        alert(JSON.stringify(this.Userform.value));
        alert(JSON.stringify(this.user_entry));
    }

    getList() {
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.userservice.getall_users(params)
            .subscribe((users: User[]) => {
                self.users = users;
                this.FillTopRecordView();
            });
    }

    FillTopRecordView() {
        var last_element = this.users[0];
        console.log(last_element);
        this.View(last_element.user_GUID);
    }

    View(user_GUID) 
    {
        this.current_user_GUID=user_GUID;
        //this.current_driverGUID = driver_GUID; //alert(this.current_driverGUID);
        var self = this;
        this.userservice.get_userinfo(user_GUID).subscribe((user) => self.user = user);

        let self2 = this;
    let params: URLSearchParams = new URLSearchParams();
    //params.set('order', 'last_name+ASC');
    self2.userservice.getLocations_byuser(user_GUID, params)
      .subscribe((get_selectlocations: USER_LOCATION_MODEL[]) => {
        self2.get_selectlocations = get_selectlocations;
        this.GetAvailableLocation();
      });

    }

AvailableSelection(e: any, getlocation) 
  {

    //alert(JSON.stringify(getlocation));
    var index_num = this.getlocations.findIndex(x => x.location_GUID == getlocation.location_GUID);
    this.getlocations.splice(index_num, 1);
    
     this.user_location.ID = 0,
     this.user_location.location_GUID = getlocation.location_GUID;
     this.user_location.user_GUID =  this.current_user_GUID;

     this.get_selectlocations.push(new USER_LOCATION_MODEL(getlocation.location_GUID, getlocation.name));

     this.userservice.save_LocationUser(this.user_location)
            .subscribe((response) => {
                if (response.status == 200) 
                {
                     this.getList();
                    //this.View(this.current_driverGUID);
                    //alert('Location Vehicle Reqistered successfully');
                    //location.reload();
                }

            });

   
  }

Delete(data)
{
 //alert(JSON.stringify(data));
 var self = this;
        this.userservice.remove_userlocation(data.ID)
            .subscribe((response) => 
            {
               if(response.status==200)
               {
                   this.GetAvailableLocation();
                   var index_num = this.get_selectlocations.findIndex(x => x.ID == data.ID);
                   this.get_selectlocations.splice(index_num, 1);
               }
               
            });
}

    GetAvailableLocation() 
{
    let self_GetAllLocations = this;   
    let params: URLSearchParams = new URLSearchParams();
    self_GetAllLocations.userservice.get_AvailableLocations(params)
      .subscribe((getlocations: LocationModel[]) => {
       
        self_GetAllLocations.getlocations = getlocations;
        //console.log(this.getlocations);
        this.vehiclesby_locations();
      });
  }
vehiclesby_locations() 
{
        for (var _i = 0; _i < this.get_selectlocations.length; _i++) {
            var item = this.get_selectlocations[_i].location_GUID;
            if (item != null) {

                var index_num = this.getlocations.findIndex(x => x.location_GUID == item);
                this.getlocations.splice(index_num, 1);
            }
        }
    }

    Updateinfo() {
        if (this.UserEditform.valid) {
            this.user_entry_edit.user_GUID = this.current_userGUID;
            this.user_entry_edit.tenant_GUID = this.current_tenantGUID;
            this.user_entry_edit.active = this.current_ActiveUser;
            alert(JSON.stringify(this.user_entry_edit));
            var self = this;
            this.userservice.Update(this.user_entry_edit)
                .subscribe((response) => {
                    if (response.status == 200) {
                        this.getList();
                        this.userEditClick();
                    }
                })
        }
    }

    Edit(user_data) {
        this.userEditClicked = !this.userEditClicked;
        this.current_userGUID = user_data.user_GUID; this.current_tenantGUID = user_data.tenant_GUID;
        this.current_ActiveUser = user_data.active;
        alert(this.current_userGUID);

        this.user_entry_edit.fullname = user_data.fullname;
        this.user_entry_edit.userID = user_data.userID;
        this.user_entry_edit.email = user_data.email;
        this.user_entry_edit.password = "*************";
        this.user_entry_edit.address1 = user_data.address1;
        this.user_entry_edit.address2 = user_data.address2;

    }

    //#region Main Genreate Token
    private storeToken(data) { localStorage.setItem('session_token', data.session_token); }
    private GenerateToken() {
        var queryHeaders = new Headers();
        queryHeaders.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: queryHeaders });
        this.httpService.http.post('http://api.zen.com.my/api/v2/user/session', '{"email":"sampath415@gmail.com","password":"sampath415"}', options)
            .subscribe((data) => { this.storeToken(data.json()); }, (error) => {
                console.log('error', JSON.parse(error._body).error.message);
            });
    }
    //#endregion

    fillChart_items() {
        let self = this; let chart_label_items = [];
        let chart_label_data = []; let chart_label_color = [];
        let chart_backgroundcolor = []; let chart_hovercolor = [];
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.driverservice.GetDriver_Chart(params)
            .subscribe((drivercharts: GETDRIVER_CHART[]) => {
                self.drivercharts = drivercharts;

                this.drivercharts.forEach((item, index) => {
                    if (item.Employment == "1") {
                        chart_label_items.push('Temporary'); chart_label_data.push(item.TOTAL);
                        chart_backgroundcolor.push('rgba(54, 162, 235, 0.8)');
                        chart_hovercolor.push("#36A2EB");
                    }
                    if (item.Employment == "2") {
                        chart_label_items.push('Permanent'); chart_label_data.push(item.TOTAL);
                        chart_backgroundcolor.push('rgba(255, 99, 132, 0.8)');
                        chart_hovercolor.push("#FF6384");
                    }
                    if (item.Employment == "3") {
                        chart_label_items.push('Contract'); chart_label_data.push(item.TOTAL);
                        chart_backgroundcolor.push('rgba(248, 203, 0, 0.8)');
                        chart_hovercolor.push("#f8cb00");
                    }
                    if (item.Employment == "4") {
                        chart_label_items.push('Probation'); chart_label_data.push(item.TOTAL);
                        chart_backgroundcolor.push('rgba(69, 183, 175, 0.8)');
                        chart_hovercolor.push("#45b7af");
                    }
                });
                this.fillChart(chart_label_items, chart_label_data, chart_backgroundcolor, chart_hovercolor);
            });
    }

    fillChart(label_items, data_items, chart_background, chart_hover) {
        //alert(label_items); alert(data_items);
        this.driverDoughnutChart = new Chart(this.driverDoughnutCanvas.nativeElement,
            {
                type: 'doughnut',
                data:
                {
                    labels: label_items,
                    datasets: [{
                        label: '# of Votes',
                        data: data_items,
                        backgroundColor: chart_background,
                        hoverBackgroundColor: chart_hover
                    }]
                },
                options: {
                    legend: {
                        display: false
                    }

                }

            });

    }

}