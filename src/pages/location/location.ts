import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { LocationService } from '../../services/locationservice';
import { BaseHttpService } from '../../services/base-http';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocationModel } from '../../models/location';
import { LOCATION_VEHICLE_MODEL } from '../../models/location';

import { GETLOCATION } from '../../models/location';

import { FormControlDirective, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';

/**
 * Generated class for the LocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html', providers: [BaseHttpService, LocationService]
})
export class LocationPage {
  Locationform: FormGroup;
  location_entry: LocationModel = new LocationModel();
  location: LocationModel = new LocationModel();
  
      location_vehicle: LOCATION_VEHICLE_MODEL = new LOCATION_VEHICLE_MODEL();


  public locations: LocationModel[] = [];
  public get_selectvehicles: GETLOCATION[] = [];
  public getvehicles: GETLOCATION[] = [];
  public _filter_getvehicles: GETLOCATION[] = [];
  public current_location_GUID: string = '';


  constructor( @Inject(FormBuilder) fb: FormBuilder, private location_service: LocationService,
    private httpService: BaseHttpService, public navCtrl: NavController, public navParams: NavParams) {

    this.Locationform = fb.group
      ({ locationname: '', locationactive: '' });

    this.getList();
  }



  RegisterLocation() {
    if (this.Locationform.valid) {

      this.location_entry.ID = 0;
      this.location_entry.location_GUID = UUID.UUID();
      this.location_entry.tenant_GUID = UUID.UUID();
      var self = this;
      let params: URLSearchParams = new URLSearchParams();
      if (this.Locationform.controls['locationactive']) {
        this.location_entry.active = 1;
      } else { this.location_entry.active = 0; }

      this.location_service.save_location(this.location_entry)
        .subscribe((response) => {
          if (response.status == 200) {
            alert('Location Reqistered successfully');
            location.reload();
          }

        })
    }
  }


  getList() {
    let self = this;
    let params: URLSearchParams = new URLSearchParams();
    //params.set('order', 'last_name+ASC');
    self.location_service.get_locationss(params)
      .subscribe((locations: LocationModel[]) => {
        self.locations = locations;
        console.log(locations); 
        this.FillTopRecordView(0);
      });
  }

  FillTopRecordView(_row: number) 
  {

    var last_element = this.locations[_row];
    console.log(last_element);
    //this.location.name = last_element.name;
    this.location.location_GUID = last_element.location_GUID;
    this.View(this.location.location_GUID,_row);
  }

  //#region View Driver Info
  View(location_GUID, _row) {

    this.current_location_GUID = location_GUID;
    //Get Selected Vehicles by location
    let self2 = this;
    let params: URLSearchParams = new URLSearchParams();
    //params.set('order', 'last_name+ASC');
    self2.location_service.getVehicles_bylocation2(location_GUID, params)
      .subscribe((get_selectvehicles: GETLOCATION[]) => {
        self2.get_selectvehicles = get_selectvehicles;
        this.GetAvailableVehicles(location_GUID,_row);
      });
  }

  GetAvailableVehicles(location_GUID,_row) 
  {
    //Get Available Vehicles
    let self_GetAllVehicles = this;
    let params: URLSearchParams = new URLSearchParams();
    self_GetAllVehicles.location_service.getVehicles(params)
      .subscribe((getvehicles: GETLOCATION[]) => {
        self_GetAllVehicles.getvehicles = getvehicles;
        this.vehiclesby_locations();
      });
  }

  vehiclesby_locations() {
        for (var _i = 0; _i < this.get_selectvehicles.length; _i++) {
            var item = this.get_selectvehicles[_i].registration_no;
            if (item != null) {

                var index_num = this.getvehicles.findIndex(x => x.registration_no == item);
                this.getvehicles.splice(index_num, 1);
            }
        }
    }

  //#endregion

  AvailableSelection(e: any, getvehicle) {
    console.log(e);
    console.log(e.checked);
    console.log(getvehicle.vehicle_GUID);
    console.log(getvehicle.registration_no);

    

    var index_num = this.getvehicles.findIndex(x => x.vehicle_GUID == getvehicle.vehicle_GUID);
    console.log("NUM IS " + index_num);
    this.getvehicles.splice(index_num, 1);
    
     this.location_vehicle.ID = 0,
            this.location_vehicle.location_GUID = this.current_location_GUID,
            this.location_vehicle.vehicle_GUID = getvehicle.vehicle_GUID

        this.location_service.save_LocationVehicle(this.location_vehicle)
            .subscribe((response) => {
                if (response.status == 200) 
                {
                    //this.View(this.current_driverGUID);
                    alert('Location Vehicle Reqistered successfully');
                    //location.reload();
                }

            })

    this.get_selectvehicles.push(new GETLOCATION(getvehicle.vehicle_GUID, getvehicle.registration_no));
  }

  RemoveSelection(e: any, getselectvehicle) {
    console.log(e);
    console.log(e.checked);
    console.log(getselectvehicle.vehicle_Gid);
    console.log(getselectvehicle.registration_no);


    var index_num = this.get_selectvehicles.findIndex(x => x.vehicle_GUID == getselectvehicle.vehicle_GUID);
    console.log("NUM IS " + index_num);
    this.get_selectvehicles.splice(index_num, 1);

    this.getvehicles.push(new GETLOCATION(getselectvehicle.vehicle_GUID, getselectvehicle.registration_no));
  }


  ionViewDidLoad() { console.log('ionViewDidLoad LocationPage'); }
  public locationRegisterClicked: boolean = false; //Whatever you want to initialise it as
  public locationEditClicked: boolean = false; //Whatever you want to initialise it as
  public addVehicleClicked: boolean = false; //Whatever you want to initialise it as
  public locationRegisterClick() { this.locationRegisterClicked = !this.locationRegisterClicked; }
  public locationEditClick() { this.locationEditClicked = !this.locationEditClicked; }
  public addVehicleClick() { this.addVehicleClicked = !this.addVehicleClicked; }



}
