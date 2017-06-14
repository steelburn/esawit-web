import { Component,Inject, OnInit, Pipe, PipeTransform  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Driver} from '../../models/driver'
import { FormControlDirective, FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';

import { BaseHttpService } from '../../services/base-http';
import { DriverService } from '../../services/driverservice2';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';

/**
 * Generated class for the DriverInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-driver-info',
  templateUrl: 'driver-info.html',
  providers:[BaseHttpService,DriverService]
})
export class DriverInfoPage {
  form2: FormControl;
  Driverform: FormGroup;
  
    driver: Driver=new Driver();
  constructor(@Inject(FormBuilder) fb: FormBuilder, private httpService: BaseHttpService,
  private driverService: DriverService,
  public navCtrl: NavController, public navParams: NavParams) 
  {
      this.driver.driver_GUID=UUID.UUID(); this.driver.tenant_GUID=UUID.UUID();
      this.GenerateToken();
      this.Driverform = fb.group({
      
      driver_GUID:[ UUID.UUID()],
      //fullname: ['', Validators.compose([Validators.maxLength(10),Validators.minLength(5), Validators.pattern('[a-zA-Z ]*'), Validators.required])],     
      fullname:'',
      identification_type: ['',Validators.minLength(3)],
      identification_no:'',
      address1:'',
      address2:'',
      address3:'',
      phone_no:'',
      email:'',
      license_no:'',
      description:'',
      active:'',
      tenant_GUID:[UUID.UUID()]
    });

    
  }

  register() 
    {
      alert(JSON.stringify(this.Driverform.value));
      alert(JSON.stringify(this.driver));
    }

save()
 {
        if (this.Driverform.valid) 
        {
          this.register();
          var self = this;     
          // this.driver.driver_GUID=UUID.UUID.toString();  this.driver.tenant_GUID=UUID.UUID.toString();       
            this.driverService.save(this.driver)
                .subscribe((response) => {                    
                    ;
                })
        }
    }

private storeToken(data){localStorage.setItem('session_token', data.session_token);}
private GenerateToken() 
{ 
  var queryHeaders = new Headers();
  queryHeaders.append('Content-Type', 'application/json');
  let options = new RequestOptions({ headers: queryHeaders });
  this.httpService.http.post('http://api.zen.com.my/api/v2/user/session', '{"email":"sampath415@gmail.com","password":"sampath415"}',options)
  .subscribe((data) => {this.storeToken(data.json());}, (error) => {console.log('error', JSON.parse(error._body).error.message);
                });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverInfoPage');
  }

}
