import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';

import { DriverService } from '../../services/driverservice2';
import { BaseHttpService } from '../../services/base-http';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Driver } from '../../models/driver';
import { GETVEHICLE } from '../../models/driver';
import { GETVEHICLE2 } from '../../models/driver';
import { GETDRIVER_CHART } from '../../models/driver';
import { VEHICLEDRIVER_MODEL } from '../../models/vehicle';

import { FormControlDirective, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';


@IonicPage()
@Component({
    selector: 'page-driver',
    templateUrl: 'driver.html', providers: [DriverService, BaseHttpService]
})
export class DriverPage {

    public driverRegisterClicked: boolean = false; //Whatever you want to initialise it as
    public driverEditClicked: boolean = false; //Whatever you want to initialise it as
    public addVehicleClicked: boolean = false; //Whatever you want to initialise it as

    public driverRegisterClick() {

        this.driverRegisterClicked = !this.driverRegisterClicked;
    }
    public driverEditClick() {

        this.driverEditClicked = !this.driverEditClicked;
    }
    public addVehicleClick() {

        this.addVehicleClicked = !this.addVehicleClicked;
    }

    AvailableVehicleform: FormGroup;

    searchTerm: string = ''; current_driverGUID: string = '';
    searchControl: FormControl;
    items: any;
    public chart_items = [];

    Driverform: FormGroup;
    driver_entry: Driver = new Driver();


    DriverEditform: FormGroup;
    driver: Driver = new Driver();
    vehicle_driver: VEHICLEDRIVER_MODEL = new VEHICLEDRIVER_MODEL();

    getvehicle: GETVEHICLE2 = new GETVEHICLE2();
    public getvehicles: GETVEHICLE2[] = [];

    get_selectvehicle: GETVEHICLE = new GETVEHICLE();
    public get_selectvehicles: GETVEHICLE[] = [];

    public drivers: Driver[] = []; public drivercharts: GETDRIVER_CHART[] = [];
    public filter_drivers = []; public label_items = [];

    @ViewChild('driverDoughnutCanvas') driverDoughnutCanvas;

    driverDoughnutChart: any;

    constructor(private fb: FormBuilder, @Inject(FormBuilder) fb2: FormBuilder, private driverservice: DriverService,
        private httpService: BaseHttpService, public navCtrl: NavController, public navParams: NavParams) {
        this.searchControl = new FormControl(); this.GenerateToken();
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

        this.driver_entry.driver_GUID = UUID.UUID(); this.driver_entry.tenant_GUID = UUID.UUID();
        //this.GenerateToken();
        this.Driverform = fb2.group({

            //fullname: ['', Validators.compose([Validators.maxLength(10),Validators.minLength(5), Validators.pattern('[a-zA-Z ]*'), Validators.required])],        
            driver_GUID: [UUID.UUID()],
            fullname: '',
            identification_type: '',
            identification_no: '',
            address1: '',
            address2: '',
            address3: '',
            phone_no: '',
            email: '',
            license_no: '',
            employment_type: '',
            description: '',
            active: 1,
            tenant_GUID: [UUID.UUID()]
        });


        this.AvailableVehicleform = fb.group({ availablevehicles: '' });
        this.getList(); this.fillChart_items();
        //this.getVehicleList();

    }

    save() {
        if (this.Driverform.valid) {
            //this.register();
            var self = this;
            // this.driver.driver_GUID=UUID.UUID.toString();  this.driver.tenant_GUID=UUID.UUID.toString();
            this.driver_entry.active = 1;
            this.driverservice.save(this.driver_entry)
                .subscribe((response) => {
                    if (response.status == 200) {
                        this.getList();
                        alert('User Reqistered successfully');
                        location.reload();
                    }

                })
        }
    }

    register() {
        alert(JSON.stringify(this.Driverform.value));
        alert(JSON.stringify(this.driver_entry));
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


    //#region Select and Remove Vehicles
    AvailableSelection(e: any, getvehicle) {
        console.log(e);
        console.log(e.checked);
        console.log(getvehicle.vehicle_Gid);
        console.log(getvehicle.registration_no);

        var index_num = this.getvehicles.findIndex(x => x.vehicle_GUID == getvehicle.vehicle_GUID);
        console.log("NUM IS " + index_num);
        this.getvehicles.splice(index_num, 1);

        this.vehicle_driver.ID = 0,
        this.vehicle_driver.driver_GUID = this.current_driverGUID,
        this.vehicle_driver.vehicle_GUID = getvehicle.vehicle_GUID,

        this.get_selectvehicles.push(new GETVEHICLE(getvehicle.vehicle_Gid, getvehicle.registration_no));
    }

    RemoveSelection(e: any, getselectvehicle) {
        console.log(e);
        console.log(e.checked);
        console.log(getselectvehicle.vehicle_Gid);
        console.log(getselectvehicle.registration_no);


        var index_num = this.get_selectvehicles.findIndex(x => x.vehicle_Gid == getselectvehicle.vehicle_Gid);
        console.log("NUM IS " + index_num);
        this.get_selectvehicles.splice(index_num, 1);

        this.getvehicles.push(new GETVEHICLE2(getselectvehicle.vehicle_GUID, getselectvehicle.registration_no));
    }
    //#endregion

    Updateinfo() {
        alert(JSON.stringify(this.DriverEditform.value));
        console.log(this.driver.driver_GUID);
        if (this.DriverEditform.valid) {
            var self = this;
            this.driverservice.Update(this.driver)
                .subscribe((response) => { console.log(response.status) })
        }
    }

    //#region User Search
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
    //#endregion



    getList() {
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.driverservice.query(params)
            .subscribe((drivers: Driver[]) => {
                self.drivers = drivers
                this.filter_drivers = drivers;
                //console.log(self.drivers);

                this.FillTopRecordView();
            });
    }

    FillTopRecordView() {

        var last_element = this.drivers[0];
        console.log(last_element);
        this.View(last_element.driver_GUID);
    }


    getVehicleList() {
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');

        self.driverservice.getVehicles2(params)
            .subscribe((getvehicles: GETVEHICLE2[]) => {
                self.getvehicles = getvehicles;
                this.vehiclesby_driver();
            });
        //console.log(this.getvehicles);
    }

    //#region View Driver Info
    View(driver_GUID) {

        this.current_driverGUID = driver_GUID; //alert(this.current_driverGUID);
        var self = this;
        this.driverservice.get(driver_GUID).subscribe((driver) => self.driver = driver);

        let self2 = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');

        self2.driverservice.getVehicles_byDriver(driver_GUID, params)
            .subscribe((get_selectvehicles: GETVEHICLE[]) => {
                self2.get_selectvehicles = get_selectvehicles;
                this.getVehicleList();
                //this.vehiclesby_driver();

            });
    }

    vehiclesby_driver() {
      for (var _i = 0; _i < this.get_selectvehicles.length; _i++) {
            var item = this.get_selectvehicles[_i].registration_no;
            if (item != null) {

                var index_num = this.getvehicles.findIndex(x => x.registration_no == item);
                this.getvehicles.splice(index_num, 1);
            }
        }
    }

    //#region View Driver Info
    Edit(driver_GUID) {
        this.driverEditClicked = !this.driverEditClicked; //hide column
        this.current_driverGUID = driver_GUID;
        alert(this.current_driverGUID);
        var self = this;
        this.driverservice.get(driver_GUID).subscribe((driver) => self.driver = driver);
    }
    //#endregion

    //this.getVehicleList();


    //#region Remove Driver
    remove(driver_GUID) {
        //alert(driver_GUID);
        var self = this;
        this.driverservice.remove(driver_GUID)
            .subscribe(() => {
                self.drivers = self.drivers.filter((item) => {
                    return item.driver_GUID != driver_GUID
                });
            });
        
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }
    //#endregion

    fillChart_items() {
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
