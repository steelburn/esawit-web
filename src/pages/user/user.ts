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

import { GETVEHICLE } from '../../models/driver';
import { VEHICLEDRIVER_MODEL } from '../../models/vehicle';

import { GETDRIVER_CHART } from '../../models/driver';


import { FormControlDirective, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';

@IonicPage()
@Component({

    selector: 'page-user',

    templateUrl: 'user.html', providers: [UserService, BaseHttpService,DriverService]

})
export class UserPage {

    public userRegisterClicked: boolean = false; //Whatever you want to initialise it as
    public userEditClicked: boolean = false; //Whatever you want to initialise it as

    public userRegisterClick() {

        this.userRegisterClicked = !this.userRegisterClicked;
    }
    public userEditClick() {

        this.userEditClicked = !this.userEditClicked;
    }
    Userform: FormGroup; user_entry: User = new User();
    UserEditform: FormGroup; User: User = new User();
    user: User = new User();
    public users: User[] = [];

    @ViewChild('driverDoughnutCanvas') driverDoughnutCanvas;
    driverDoughnutChart: any;


    public drivercharts: GETDRIVER_CHART[] = [];
   

    constructor( @Inject(FormBuilder) fb2: FormBuilder, private userservice: UserService,private driverservice: DriverService,
        private httpService: BaseHttpService, public navCtrl: NavController, public navParams: NavParams) {
        this.GenerateToken();
        this.getList();
        this.Userform = fb2.group
            ({
                fullname: '',
                userID: '',
                email: '',
                address1: '',
                address2: '',
                password: '',
                role_GUID: '',
                active: ''
            });

            this.fillChart_items();
    }

    save() {
        if (this.Userform.valid) {
            alert(this.Userform.value['active']);

            if (this.Userform.value['active'] == true) {
                this.user_entry.active = 1;
            } else { this.user_entry.active = 0; }
            this.user_entry.user_GUID = UUID.UUID.toString();
            this.user_entry.tenant_GUID = UUID.UUID.toString();
            this.register();

            var self = this;
            //if(this.Userform)
            this.userservice.save(this.user_entry)
                .subscribe((response) => {
                    if (response.status == 200) {
                        //this.getList();
                        alert('User Reqistered successfully');
                        location.reload();
                    }

                })
        }
    }

    register() {
        alert(JSON.stringify(this.Userform.value));
        alert(JSON.stringify(this.user_entry));
    }

    getList() 
    {
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.userservice.getall_users(params)
            .subscribe((users: User[]) => 
            {
                self.users = users;
                this.FillTopRecordView();
            });
    }

    FillTopRecordView() 
    {
        var last_element = this.users[0];
        console.log(last_element);
        this.View(last_element.user_GUID);
    }

    View(user_GUID) {

        //this.current_driverGUID = driver_GUID; //alert(this.current_driverGUID);
        var self = this;
        this.userservice.get_userinfo(user_GUID).subscribe((user) => self.user = user);
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

     fillChart_items() 
    {
        let self = this; let chart_label_items = []; 
        let chart_label_data = []; let chart_label_color = [];
        let chart_backgroundcolor=[];let chart_hovercolor=[];
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.driverservice.GetDriver_Chart(params)
            .subscribe((drivercharts: GETDRIVER_CHART[]) => {
                self.drivercharts = drivercharts;

                
                // console.log('Chart Detail.');
                // var index_num = this.drivercharts.findIndex(x => x.Employment == null);
                // this.drivercharts.splice(index_num, 1);
                // console.log(this.drivercharts);
                // console.log('End chart Detail.');

                this.drivercharts.forEach((item, index) => 
                {
                    if(item.Employment=="1")
                    {
                        chart_label_items.push('Temporary');chart_label_data.push(item.TOTAL);
                        chart_backgroundcolor.push('rgba(54, 162, 235, 0.8)');
                        chart_hovercolor.push( "#36A2EB");
                    }
                    if(item.Employment=="2")
                     {
                         chart_label_items.push('Permanent');chart_label_data.push(item.TOTAL);
                         chart_backgroundcolor.push('rgba(255, 99, 132, 0.8)');
                         chart_hovercolor.push("#FF6384");
                     }
                    if(item.Employment=="3"){
                         chart_label_items.push('Contract');chart_label_data.push(item.TOTAL);
                        chart_backgroundcolor.push('rgba(248, 203, 0, 0.8)');
                        chart_hovercolor.push("#f8cb00");
                    }
                    if(item.Employment=="4"){
                         chart_label_items.push('Probation');chart_label_data.push(item.TOTAL);
                         chart_backgroundcolor.push('rgba(69, 183, 175, 0.8)');
                         chart_hovercolor.push("#45b7af");
                    }
                });
                this.fillChart(chart_label_items,chart_label_data,chart_backgroundcolor,chart_hovercolor);
            });
    }
    
    fillChart(label_items,data_items,chart_background,chart_hover) {
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