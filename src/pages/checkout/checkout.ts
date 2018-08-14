import { HomePage } from './../home/home';

import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController,ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class Checkout {

  WooCommerce:any;
  newOrder:any;
  paymentMethods :any [];
  paymentMethod : any;
  userInfo :any;
  loading;
  constructor(public toastCtrl : ToastController,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,public alertCtrl : AlertController) {
    this.newOrder = {};
    this.newOrder.billing_address = {};
    this.newOrder.shipping_address ={};

    this.paymentMethods = [
      {method_id:"bacs", method_title:"Direct Banck Transfer"},
      {method_id:"cod", method_title:"Cash on Delivery"},
      {method_id:"paypal", method_title:"PayPal"}
    ];


    this.WooCommerce = WC({
  		url:"http://localhost/wordpress/",
      consumerKey:"ck_89e0af24c6c9af495255ef1e553f5982c0913504",
  consumerSecret:"cs_1d60189f785ca7ef28b50801fa363fc3e526ecf3",
    });
    this.storage.get("userLoginInfo").then((userLoginInfo) =>{

        this.userInfo = userLoginInfo.user;
        let email = userLoginInfo.user.email;

        this.WooCommerce.getAsync("customers/email/" + email).then((data)=>{
          
          this.newOrder = JSON.parse(data.body).customer;
        })

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }


placeOrder(){
  let orderItems :any[] =[];
  let data : any ={};
  let paymentData : any ={};
  this.paymentMethods.forEach((element , index)=>{

    if(element.method_id == this.paymentMethod){
        paymentData = element;
    }
  });

  data ={
          payment_details :{
              method_id:paymentData.method_id,
              method_title: paymentData.method_title,
              paid :true,
          },

          billing_address : this.newOrder.billing_address,
          shipping_address: this.newOrder.billing_address,
          customer_id : this.userInfo.id || '',
          line_items :orderItems,
  };
      if(paymentData.method_id == "paypal"){
        //TODO
      } 
      
      
      else{
        this.loading = this.loadingCtrl.create({
          content: 'Please Wait '
          
        });
        this.loading.present();
        this.storage.get("cart").then((cart)=>{
            cart.forEach((element, index)=>{
              //console.log(element)
             orderItems.push({
                product_id :element.product.id,
                quantity: element.qty,
              });
            });
          
            data.line_items = orderItems;
            let orderData : any ={};
            orderData.order = data;
            this.WooCommerce.postAsync("orders", orderData).then((data)=>{
              console.log(JSON.parse(data.body).order);
              this.loading.dismiss();
              let response =(JSON.parse(data.body));

              if(response.errors){
                this.toastCtrl.create({
                  message:"Error Please fill all fields",
                  duration:4000,
                }).present();
                return;
              }

              this.alertCtrl.create({
                title: "Order Placed Sucsessfully",
                message:"Please Check Your orders page ",
                buttons:[{
                  text:"OK",
                   handler:()=>{
               
                  //this.navCtrl.popAll();
                  this.navCtrl.setRoot(HomePage)
                  }
                }]
              }).present();

            })

        })
        
      }
     

}

}







