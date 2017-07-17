import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';


import { BaseHttpService } from '../../services/base-http';
import { ReportService } from '../../services/reportservice';

import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { ReconciliationReport } from '../../models/reconciliation';
import{ReconciliationPage} from '../../pages/reconciliation/reconciliation';



import { FormControlDirective, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';

@IonicPage()
@Component({
  selector: 'page-reconciliationupdate',
  templateUrl: 'reconciliationupdate.html',
  providers: [BaseHttpService,ReportService]
})
export class ReconciliationupdatePage {

  Reconciliationform: FormGroup; reconciliation_entry: ReconciliationReport = new ReconciliationReport();
  //driver: ReconciliationReport = new ReconciliationReport();
    
  constructor( @Inject(FormBuilder) fb2: FormBuilder,public reportservice : ReportService,
    private httpService: BaseHttpService, public navCtrl: NavController, public navParams: NavParams) {
    this.GenerateToken();
    this.Reconciliationform = fb2.group
      ({
        remarks: '',
        remark_status: ''
      });
  }

  Update_ReconciliationStatus() 
  {
    
     alert(this.navParams.get('ID'));
     alert(JSON.stringify(this.Reconciliationform.value));
      if (this.Reconciliationform.valid) 
      {
        var self = this;
        this.reconciliation_entry.ID=this.navParams.get('ID');
        this.reportservice.Update_Status(this.reconciliation_entry)
          .subscribe((response) => { this.Redirect(); })
      }
    
  }

  Redirect()
  {
    this.navCtrl.push(ReconciliationPage);
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



}