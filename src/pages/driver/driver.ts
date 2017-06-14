import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms'; 

import { DriverService } from '../../services/driverservice2';
import {BaseHttpService} from '../../services/base-http';
import {Http, Headers,RequestOptions, URLSearchParams} from '@angular/http';
import { Driver } from '../../models/driver';



/**
 * Generated class for the DriverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',providers: [DriverService,BaseHttpService]
})
export class DriverPage {

public drivers: Driver[] = [];   

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('driverDoughnutCanvas') driverDoughnutCanvas;
 
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  driverDoughnutChart: any;

  constructor(private driverservice: DriverService,public navCtrl: NavController, public navParams: NavParams) 
  {

    this.getList();


  }
getList() 
{
        let self = this;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('order', 'last_name+ASC');
        self.driverservice.query(params)
            .subscribe((drivers: Driver[]) => {
                self.drivers = drivers
                console.log(self.drivers);
            });
}


remove(driver_GUID) 
{
    alert(driver_GUID);
        var self = this;
        this.driverservice.remove(driver_GUID)
            .subscribe(() => {
                self.drivers = self.drivers.filter((item) => 
                {
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
