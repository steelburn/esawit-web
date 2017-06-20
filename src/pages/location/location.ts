import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { LocationService } from '../../services/locationservice';
import { BaseHttpService } from '../../services/base-http';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { LocationModel } from '../../models/location';
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
  location: LocationModel=new LocationModel();

  public locations: LocationModel[] = [];   


  constructor( @Inject(FormBuilder) fb: FormBuilder, private location_service: LocationService,
    private httpService: BaseHttpService, public navCtrl: NavController, public navParams: NavParams) {

    this.Locationform = fb.group
      ({ locationname: '', locationactive: '' });
    
    this.getList();
  }



  RegisterLocation() 
  {
    if (this.Locationform.valid) {
     
      this.location_entry.ID=0;
      this.location_entry.location_GUID=UUID.UUID();
      this.location_entry.tenant_GUID=UUID.UUID();
      var self = this;
      let params: URLSearchParams = new URLSearchParams();
      if(this.Locationform.controls['locationactive'])
      {
        this.location_entry.active=1;
      }else{ this.location_entry.active=0;}

      this.location_service.save_location(this.location_entry)
        .subscribe((response) => 
        {
          if (response.status == 200) {
            alert('Location Reqistered successfully');
            location.reload();
          }

        })
    }
  }


getList() 
{
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.location_service.get_locationss(params)
            .subscribe((locations: LocationModel[]) => 
            {
                self.locations = locations;
                console.log(locations);
            });
}

//#region View Driver Info
View(location_GUID)
{
  // alert(location_GUID);
  //   console.log(location_GUID);
   var self = this;
   this.location_service.get(location_GUID).subscribe((location) => self.location = location);


  
}
//#endregion






  ionViewDidLoad() { console.log('ionViewDidLoad LocationPage'); }
  public locationRegisterClicked: boolean = false; //Whatever you want to initialise it as
  public locationEditClicked: boolean = false; //Whatever you want to initialise it as
  public addVehicleClicked: boolean = false; //Whatever you want to initialise it as
  public locationRegisterClick() { this.locationRegisterClicked = !this.locationRegisterClicked; }
  public locationEditClick() { this.locationEditClicked = !this.locationEditClicked; }
  public addVehicleClick() { this.addVehicleClicked = !this.addVehicleClicked; }



}
