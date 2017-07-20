import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { VehicleService } from '../../services/vehicleservice';
import { BaseHttpService } from '../../services/base-http';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { VehicleModel } from '../../models/vehicle';
import { GET_VEHICLE_LOCATION } from '../../models/vehicle';
import { LocationModel } from '../../models/location';
import { LOCATION_VEHICLE_MODEL } from '../../models/location';


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
  location_vehicle: LOCATION_VEHICLE_MODEL = new LOCATION_VEHICLE_MODEL();

  public vehicles: VehicleModel[] = [];
  public get_selectlocations: GET_VEHICLE_LOCATION[] = [];
  public getlocations: LocationModel[] = [];

  //public getlocations: GET_VEHICLE_LOCATION[] = [];
  public _filter_getloctions: GET_VEHICLE_LOCATION[] = [];

  public current_vehicle_GUID: string = '';
  Active_Deactive_vehicle: VehicleModel = new VehicleModel();

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
  
  AvailableSelection(e: any, getlocation) {

    var index_num = this.getlocations.findIndex(x => x.location_GUID == getlocation.location_GUID);
    this.getlocations.splice(index_num, 1);
    
     this.location_vehicle.ID = 0,
     this.location_vehicle.location_GUID = getlocation.location_GUID;
     this.location_vehicle.vehicle_GUID =  this.current_vehicle_GUID;

        this.vehicle_service.save_LocationVehicle(this.location_vehicle)
            .subscribe((response) => {
                if (response.status == 200) 
                {
                    //this.View(this.current_driverGUID);
                    alert('Location Vehicle Reqistered successfully');
                    //location.reload();
                }

            });

    this.get_selectlocations.push(new GET_VEHICLE_LOCATION(getlocation.location_GUID, getlocation.name));
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

    var last_element = this.vehicles[_row];
    console.log(last_element);
    this.vehicle.registration_no = last_element.registration_no;
    this.vehicle.vehicle_GUID = last_element.vehicle_GUID;
    this.View(this.vehicle.vehicle_GUID);
  }

  remove(vehicle_GUID) 
  {
    alert(vehicle_GUID);
    var self = this;
    this.vehicle_service.remove(vehicle_GUID)
      .subscribe(() => {
        self.vehicles = self.vehicles.filter((item) => 
        {
          return item.vehicle_GUID != vehicle_GUID
        });
        this.FillTopRecordView(0);
      });
  }

  View(vehicle_GUID) {

   this.current_vehicle_GUID=vehicle_GUID;
  //alert(vehicle_GUID);
    //Get Location
    var self = this;
    this.vehicle_service.get(vehicle_GUID).subscribe((vehicle) => self.vehicle = vehicle);


    //Get Selected Vehicles by location
    let self2 = this;
    let params: URLSearchParams = new URLSearchParams();
    //params.set('order', 'last_name+ASC');
    self2.vehicle_service.getLocations_byvehicle(vehicle_GUID, params)
      .subscribe((get_selectlocations: GET_VEHICLE_LOCATION[]) => {
        self2.get_selectlocations = get_selectlocations;
        this.GetAvailableVehicles();
      });

    //Get Available Vehicles
    

  }

GetAvailableVehicles() 
{
    let self_GetAllLocations = this;   
    let params: URLSearchParams = new URLSearchParams();
    self_GetAllLocations.vehicle_service.getLocations2(params)
      .subscribe((getlocations: LocationModel[]) => {
       
        self_GetAllLocations.getlocations = getlocations;
        console.log(this.getlocations);
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

 Deactive_Vehicle(data) 
  {
    alert(JSON.stringify(data))
    if(data.active==0 || data.active==null)
    {
      this.Active_Deactive_vehicle.active = 1;
    }
    if(data.active==1)
    {
      this.Active_Deactive_vehicle.active = 0;
    }
    this.Active_Deactive_vehicle.ID = data.ID;
    this.Active_Deactive_vehicle.vehicle_GUID = data.vehicle_GUID;
    this.Active_Deactive_vehicle.tenant_GUID = data.tenant_GUID;
    this.Active_Deactive_vehicle.registration_no = data.registration_no;
    
    var self = this;
    this.vehicle_service.Deactive_Vehicle(this.Active_Deactive_vehicle)
      .subscribe((response) => {
        console.log(response);
      })

  }

  ionViewDidLoad() { console.log('ionViewDidLoad VehiclePage'); }
  public vehicleRegisterClicked: boolean = false; //Whatever you want to initialise it as
  public vehicleEditClicked: boolean = false; //Whatever you want to initialise it as
  public addLocationClicked: boolean = false; //Whatever you want to initialise it as
  public vehicleRegisterClick() { this.vehicleRegisterClicked = !this.vehicleRegisterClicked; }
  public vehicleEditClick() { this.vehicleEditClicked = !this.vehicleEditClicked; }
  public addLocationClick() { this.addLocationClicked = !this.addLocationClicked; }
}
