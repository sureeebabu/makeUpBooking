import { Component, ViewChild} from '@angular/core';
import { NavController, IonicPage, PopoverController} from 'ionic-angular';
   //*********** Providers **************/
import { BlogProvider } from '../../providers/blog';
import { DataProvider } from '../../providers/data';
import { BookingProvider } from '../../providers/booking';
import { MessageProvider } from '../../providers/messages';
import { ServiceListProvider } from '../../providers/service-list';
   //*********** Angular firebase **************/
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from 'angularfire2/database/interfaces';
// Chart js
import { Chart } from 'chart.js';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: Observable<any[]>;
  ref: AngularFireList<any>;
 
  months = [
    {value: 0, name: 'January'},
    {value: 1, name: 'February'},
    {value: 2, name: 'March'},
    {value: 3, name: 'April'}, // you can add more months
  ];
 
  booking = {
    value: 0,
    expense: false,
    month: 0
  }
 
  @ViewChild('valueBarsCanvas') valueBarsCanvas;
  valueBarsChart: any;
 
  chartData = null;
 
  blogList: any;
  productList: any;
  bookingList: any;
  messageList: any;
  userList: any;
  serviceList: any;
  orderList: any;
  id:any;

  
  constructor(public navCtrl: NavController, public blogProvider: BlogProvider,
     public popoverCtrl: PopoverController, private db: AngularFireDatabase,
     public dataProvider: DataProvider, public bookingProvider: BookingProvider,
     public messageProvider: MessageProvider, public serviceProvider: ServiceListProvider) { 

      //*********** Fetch Services **************/
      this.serviceProvider.getService().on('value', snapshot => {
        this.serviceList = [];
        snapshot.forEach( snap => {
          this.serviceList.push({
            id: snap.key,
          });
  
        });
      
       });

       //*********** Fetch Number of users registered **************/
      this.dataProvider.getCustomerList().on('value', snapshot =>{
        this.userList = [];
        snapshot.forEach(snap =>{
          this.userList.push({
            id: snap.key,
          });
        });
      });	

     //*********** Fetch Orders List **************/
      this.dataProvider.getOrderList().on('value', snapshot =>{
    		this.orderList = [];
        console.log(snapshot.val());
    			 snapshot.forEach( snap => {
      	 	 this.orderList.push({
            id: snap.key,
      	   });
    	  });
      });

      //*********** Fetch Blog list**************/
      this.blogProvider.getBlog().on('value', snapshot => {
        this.blogList = [];
        snapshot.forEach( snap => {
          this.blogList.push({
            id: snap.key,
          });
        });
       });

       //*********** Fetch Number of messages **************/
       this.messageProvider.getMessage().on('value', snapshot => {
        this.messageList = [];
        snapshot.forEach( snap => {
          this.messageList.push({
            id: snap.key,
          });
        });
       });

        //*********** Fetch Number of products **************/
       this.dataProvider.getProductList().on('value', snapshot => {
        this.productList = [];
        snapshot.forEach( snap => {
          this.productList.push({
            id: snap.key,
          });
  
        });
      
       });


    	this.bookingProvider.getBookList().on('value', snapshot =>{
    		this.bookingList = [];
             console.log(snapshot.val());
    			 snapshot.forEach( snap => {
      	 	 this.bookingList.push({
              id: snap.key,
      	   });
    	  });
      });
    }

    ionViewDidLoad() {
      // Reference to our Firebase List
      this.ref = this.db.list('booking-chart', ref => ref.orderByChild('month'));
   
      // Catch any update to draw the Chart
      this.ref.valueChanges().subscribe(result => {
        if (this.chartData) {
          this.updateCharts(result)
        } else {
          this.createCharts(result)
        }
      })
    }
 
    

  getReportValues() {
    let reportByMonth = {
      0: null,
      1: null,
      2: null,
      3: null
    };
   
    for (let trans of this.chartData) {
      if (reportByMonth[trans.month]) {
        if (trans.expense) {
          reportByMonth[trans.month] -= +trans.value;
        } else {
          reportByMonth[trans.month] += +trans.value;
        }
      } else {
        if (trans.expense) {
          reportByMonth[trans.month] = 0 - +trans.value;
        } else {
          reportByMonth[trans.month] = +trans.value;
        }
      }
    }
    return Object.keys(reportByMonth).map(a => reportByMonth[a]);
  }

  createCharts(data) {
    this.chartData = data;
   
    // Calculate Values for the Chart
    let chartData = this.getReportValues();
   
    // Create the chart
    this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(this.months).map(a => this.months[a].name),
        datasets: [{
          data: chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItems, data) {
              return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            ticks: {
              callback: function (value, index, values) {
                return value;
              },
              suggestedMin: 0
            }
          }]
        },
      }
    });
  }

  updateCharts(data) {
    this.chartData = data;
    let chartData = this.getReportValues();
   
    // Update our dataset
    this.valueBarsChart.data.datasets.forEach((dataset) => {
      dataset.data = chartData
    });
    this.valueBarsChart.update();
  }


  showMessage() {
    this.navCtrl.push('MessageListPage');
  }

}









