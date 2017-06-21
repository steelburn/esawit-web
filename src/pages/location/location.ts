import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { LocationService } from '../../services/locationservice';
import { BaseHttpService } from '../../services/base-http';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocationModel } from '../../models/location';
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

  public locations: LocationModel[] = [];
  public get_selectvehicles: GETLOCATION[] = [];
  public getvehicles: GETLOCATION[] = [];
  public _filter_getvehicles: GETLOCATION[] = [];



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
      });
  }

  //#region View Driver Info
  View(location_GUID) {

    //Get Location
    var self = this;
    this.location_service.get(location_GUID).subscribe((location) => self.location = location);


    //Get Selected Vehicles by location
    let self2 = this;
    let params: URLSearchParams = new URLSearchParams();
    //params.set('order', 'last_name+ASC');
    self2.location_service.getVehicles_bylocation(location_GUID, params)
      .subscribe((get_selectvehicles: GETLOCATION[]) => {
        self2.get_selectvehicles = get_selectvehicles
      });

    //Get Available Vehicles
    let self_GetAllVehicles = this;

    self_GetAllVehicles.location_service.getVehicles(params)
      .subscribe((getvehicles: GETLOCATION[]) => 
      {
        console.log('Getting Available Vehicles');
        console.log(getvehicles);
        self_GetAllVehicles.getvehicles= getvehicles.filter(getvehicle => getvehicle.location_GUID !== location_GUID);
        console.log('After some time');
        console.log(this.getvehicles);

      });

  }
  //#endregion

AvailableSelection(e:any,getvehicle)
{
    console.log(e);
    console.log(e.checked);
    console.log(getvehicle.vehicle_GUID);
    console.log(getvehicle.registration_no);
    
    
    var index_num = this.getvehicles.findIndex(x => x.vehicle_GUID==getvehicle.vehicle_GUID);
    console.log("NUM IS "+index_num);
    this.getvehicles.splice(index_num, 1);
    
    this.get_selectvehicles.push(new GETLOCATION(getvehicle.vehicle_GUID,getvehicle.registration_no));
}

RemoveSelection(e:any,getselectvehicle)
{
    console.log(e);
    console.log(e.checked);
    console.log(getselectvehicle.vehicle_Gid);
    console.log(getselectvehicle.registration_no);
    
    
    var index_num = this.get_selectvehicles.findIndex(x => x.vehicle_GUID==getselectvehicle.vehicle_GUID);
    console.log("NUM IS "+index_num);
    this.get_selectvehicles.splice(index_num, 1);
    
    this.getvehicles.push(new GETLOCATION(getselectvehicle.vehicle_GUID,getselectvehicle.registration_no));
}


  ionViewDidLoad() { console.log('ionViewDidLoad LocationPage'); }
  public locationRegisterClicked: boolean = false; //Whatever you want to initialise it as
  public locationEditClicked: boolean = false; //Whatever you want to initialise it as
  public addVehicleClicked: boolean = false; //Whatever you want to initialise it as
  public locationRegisterClick() { this.locationRegisterClicked = !this.locationRegisterClicked; }
  public locationEditClick() { this.locationEditClicked = !this.locationEditClicked; }
  public addVehicleClick() { this.addVehicleClicked = !this.addVehicleClicked; }



}
