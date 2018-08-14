import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class Orders {
  WooCommerce:any;
  orders:any;
 
  
  constructor(public storage :Storage,public navCtrl: NavController, public navParams: NavParams) {


    this.WooCommerce = WC({
  		url:"http://localhost/wordpress/",
      consumerKey:"ck_89e0af24c6c9af495255ef1e553f5982c0913504",
  consumerSecret:"cs_1d60189f785ca7ef28b50801fa363fc3e526ecf3",
    });
   
    this.storage.get("userLoginInfo").then((userLoginInfo) =>{

     // this.userInfo = userLoginInfo.user;
      let id = userLoginInfo.user.id;
      console.log(id);

       this.WooCommerce.getAsync("orders?filter[customer_id]="+id).then((data) => {
         //console.log(JSON.parse(data.body));
        
         let response =(JSON.parse(data.body));
           console.log(response);
          this.orders = JSON.parse(data.body).orders;
         
         
        
        });

  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

 

}
