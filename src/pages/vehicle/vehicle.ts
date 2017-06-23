import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { VehicleService } from '../../services/vehicleservice';
import { BaseHttpService } from '../../services/base-http';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { VehicleModel } from '../../models/vehicle';
import { GET_VEHICLE_LOCATION } from '../../models/vehicle';

import { FormControlDirective, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';

/**
 * Generated class for the VehiclePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vehicle',
  templateUrl: 'vehicle.html', providers: [BaseHttpService, VehicleService]
})
export class VehiclePage {
  Vehicleform: FormGroup;
  vehicle_entry: VehicleModel = new VehicleModel();
  vehicle: VehicleModel = new VehicleModel();

  public vehicles: VehicleModel[] = [];
  public get_selectlocations: GET_VEHICLE_LOCATION[] = [];
  public getlocations: GET_VEHICLE_LOCATION[] = [];
  public _filter_getloctions: GET_VEHICLE_LOCATION[] = [];
  constructor( @Inject(FormBuilder) fb: FormBuilder, private vehicle_service: VehicleService,
    private httpService: BaseHttpService, public navCtrl: NavController, public navParams: NavParams) {

    this.Vehicleform = fb.group
      ({ vehiclename: '', vehicleactive: '' });

    this.getList();
  }



  RegisterVehicle() {
    if (this.Vehicleform.valid) {

      this.vehicle_entry.ID = 0;
      this.vehicle_entry.vehicle_GUID = UUID.UUID();
      this.vehicle_entry.tenant_GUID = UUID.UUID();
      var self = this;
      let params: URLSearchParams = new URLSearchParams();
      if (this.Vehicleform.controls['locationactive']) {
        this.vehicle_entry.active = 1;
      } else { this.vehicle_entry.active = 0; }

      this.vehicle_service.save_vehicle(this.vehicle_entry)
        .subscribe((response) => {
          if (response.status == 200) {
            alert('Vehicle Reqistered successfully');
            location.reload();
          }

        })
    }
  }

  getList() {
    let self = this;
    let params: URLSearchParams = new URLSearchParams();
    params.set('order', 'registration_no+ASC');
    self.vehicle_service.get_vehicles(params)
      .subscribe((vehicles: VehicleModel[]) => {
        self.vehicles = vehicles;
        this.FillTopRecordView(0);
      });
  }
  
  FillTopRecordView(_row: number) 
  {

    var last_element = this.vehicle[_row];
    console.log(last_element);
    // this.vehicle.registration_no = last_element.registration_no;
    // this.vehicle.vehicle_GUID = last_element.vehicle_GUID;
    // this.View(this.vehicle.vehicle_GUID);
  }

  remove(vehicle_GUID) {
    alert(vehicle_GUID);
    var self = this;
    this.vehicle_service.remove(vehicle_GUID)
      .subscribe(() => {
        self.vehicles = self.vehicles.filter((item) => {
          return item.vehicle_GUID != vehicle_GUID
        });
      });
  }

  View(vehicle_GUID) {
  alert(vehicle_GUID);
    //Get Location
    var self = this;
    this.vehicle_service.get(vehicle_GUID).subscribe((vehicle) => self.vehicle = vehicle);


    //Get Selected Vehicles by location
    let self2 = this;
    let params: URLSearchParams = new URLSearchParams();
    //params.set('order', 'last_name+ASC');
    self2.vehicle_service.getLocations_byvehicle(vehicle_GUID, params)
      .subscribe((get_selectlocations: GET_VEHICLE_LOCATION[]) => {
        self2.get_selectlocations = get_selectlocations
      });

    //Get Available Vehicles
    let self_GetAllLocations = this;

    self_GetAllLocations.vehicle_service.getLocations(params)
      .subscribe((getlocations: GET_VEHICLE_LOCATION[]) => {
        console.log('Getting Available Vehicles');
        console.log(getlocations);
        self_GetAllLocations.getlocations = getlocations.filter(getlocation => getlocation.vehicle_GUID !== vehicle_GUID);
        console.log('After some time');
        console.log(this.getlocations);

      });

  }




  ionViewDidLoad() { console.log('ionViewDidLoad VehiclePage'); }
  public vehicleRegisterClicked: boolean = false; //Whatever you want to initialise it as
  public vehicleEditClicked: boolean = false; //Whatever you want to initialise it as
  public addLocationClicked: boolean = false; //Whatever you want to initialise it as
  public vehicleRegisterClick() { this.vehicleRegisterClicked = !this.vehicleRegisterClicked; }
  public vehicleEditClick() { this.vehicleEditClicked = !this.vehicleEditClicked; }
  public addLocationClick() { this.addLocationClicked = !this.addLocationClicked; }
}
