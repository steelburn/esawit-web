import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';

import { DriverService } from '../../services/driverservice2';
import { BaseHttpService } from '../../services/base-http';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Driver } from '../../models/driver';
import { FormControlDirective, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';




@IonicPage()
@Component({
    selector: 'page-driver',
    templateUrl: 'driver.html', providers: [DriverService, BaseHttpService]
})
export class DriverPage {

    public driverRegisterClicked: boolean = false; //Whatever you want to initialise it as
    public addVehicleClicked: boolean = false; //Whatever you want to initialise it as

    public driverRegisterClick() {

        this.driverRegisterClicked = !this.driverRegisterClicked;
    }
    public addVehicleClick() {

        this.addVehicleClicked = !this.addVehicleClicked;
    }


    searchTerm: string = '';
    searchControl: FormControl;
    items: any;

    DriverEditform: FormGroup;
    driver: Driver = new Driver();
    public drivers: Driver[] = [];
    public filter_drivers = [];

    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('driverDoughnutCanvas') driverDoughnutCanvas;

    barChart: any;
    doughnutChart: any;
    lineChart: any;
    driverDoughnutChart: any;

    constructor(private fb: FormBuilder, private driverservice: DriverService,
        private httpService: BaseHttpService, public navCtrl: NavController, public navParams: NavParams) {
        this.searchControl = new FormControl();
        this.GenerateToken();
        this.DriverEditform = fb.group
            ({

                fullname: '',
                driver_GUID: '',
                tenant_GUID: '',
                identification_no: '',
                identification_type: '',
                address1: '',
                address2: '',
                address3: '',
                phone_no: '',
                email: '',
                license_no: '',
                start_year: '',
                description: '',
                employment_type: '',
                active: ''

            });

        this.getList();
    }


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

    Updateinfo() {
        alert(JSON.stringify(this.DriverEditform.value));
        console.log(this.driver.driver_GUID);
        if (this.DriverEditform.valid) {
            var self = this;
            this.driverservice.Update(this.driver)
                .subscribe((response) => { console.log(response.status) })
        }
    }

    setFilteredItems() {

        this.drivers = this.filterItems(this.searchTerm);
        var last_element = this.drivers[0];
        console.log(last_element);
        this.driver.driver_GUID = last_element.driver_GUID;
        this.driver.tenant_GUID = last_element.tenant_GUID;
        this.driver.fullname = last_element.fullname;
        this.driver.email = last_element.email;
        this.driver.phone_no = last_element.phone_no;
        this.driver.identification_no = last_element.identification_no;
        this.driver.license_no = last_element.license_no;
        this.driver.employment_type = last_element.employment_type;

    }

    filterItems(searchTerm) {
        if (searchTerm != '') {
            return this.drivers.filter((driver) => {
                return driver.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            });
        }
        else {
            console.log(this.drivers);
            console.log(this.filter_drivers);
            this.drivers = this.filter_drivers;
            return this.drivers;
        }
    }

    getList() {
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.driverservice.query(params)
            .subscribe((drivers: Driver[]) => {
                self.drivers = drivers
                this.filter_drivers = drivers;
                console.log(self.drivers);

                var last_element = drivers[0];
                console.log(last_element);
                this.driver.driver_GUID = last_element.driver_GUID;
                this.driver.tenant_GUID = last_element.tenant_GUID;
                this.driver.fullname = last_element.fullname;
                this.driver.email = last_element.email;
                this.driver.phone_no = last_element.phone_no;
                this.driver.identification_no = last_element.identification_no;
                this.driver.license_no = last_element.license_no;
                this.driver.employment_type = last_element.employment_type;

            });


        // this.DriverEditform.setValue
        // ({
        //     fullname:this.drivers.filter(x=> x.fullname === "fullname")[0]
        // });

    }

    Edit(driver_GUID) {
        var self = this;
        this.driverservice.get(driver_GUID).subscribe((driver) => self.driver = driver);
        //console.log(self);
        // this.DriverEditform.setValue
        // ({
        //     fullname:'KUMARRR'


        // });
    }

    remove(driver_GUID) {
        alert(driver_GUID);
        var self = this;
        this.driverservice.remove(driver_GUID)
            .subscribe(() => {
                self.drivers = self.drivers.filter((item) => {
                    return item.driver_GUID != driver_GUID
                });
            });
    }

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
