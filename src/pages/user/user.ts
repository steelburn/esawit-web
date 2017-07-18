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


import { FormControlDirective, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: 'user.html', providers: [UserService, BaseHttpService]
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

    constructor( @Inject(FormBuilder) fb2: FormBuilder, private userservice: UserService,
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











    ionViewDidLoad() {
        console.log('ionViewDidLoad DriverPage');

        this.driverDoughnutChart = new Chart(this.driverDoughnutCanvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ["Permanent", "Temporary", "Probation", "Contract"],
                datasets: [{
                    label: '# of Votes',
                    data: [75, 29, 5, 19],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(248, 203, 0, 0.8)',
                        'rgba(69, 183, 175, 0.8)'
                    ],
                    hoverBackgroundColor: [
                        "#36A2EB",
                        "#FF6384",
                        "#f8cb00",
                        "#45b7af"
                    ]
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