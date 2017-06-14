import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DriverModel } from '../../models/driver';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms'; 

/**
 * Generated class for the DriverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
})
export class DriverPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('driverDoughnutCanvas') driverDoughnutCanvas;
 
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  driverDoughnutChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {




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
