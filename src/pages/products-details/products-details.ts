import { CartPage } from './../cart/cart';
import { Component } from '@angular/core';
import {ModalController ,NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import{Storage} from "@ionic/storage";

@Component({
  selector: 'page-products-details',
  templateUrl: 'products-details.html',
})
export class ProductsDetailsPage {
  
  WooCommerce: any; 
  product: any;
  quan:number =1;
 reviews: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage :Storage,private toastCtrl: ToastController,public modalCtrl: ModalController
  ) {

    this.product = this.navParams.get("product");
    console.log(this.product);

    this.WooCommerce = WC({
      url:"http://localhost/wordpress/",
      consumerKey:"ck_89e0af24c6c9af495255ef1e553f5982c0913504",
  consumerSecret:"cs_1d60189f785ca7ef28b50801fa363fc3e526ecf3",
    });

  	// this.WooCommerce.getAsync("products/" + this.product.id+)
    //   .then((data) => {
    //   //  console.log(JSON.parse(data.body).product);
    //     this.reviews = JSON.parse(data.body).product_variations;
    //    // console.log('this.reviews');
    //     console.log(this.reviews);
    //   }, (error) => {
    //     console.log(error);
    //   });

  }


  addToCart(product){
    
    this.storage.get("cart").then((data)=>{
      if(data== null || data.length ==0){

          data=[];
          data.push({
            "product":product,
            "qty":this.quan,
            "amount":parseFloat(product.price)*this.quan,
          })
      } else{
        let added =0;
        for(let i=0 ;i < data.length; i++ ){
          if(product.id ==data[i].product.id){
            console.log("product is alredy in the cart");
        
           

          }
        }
        if(added == 0){
          data.push({
            "product":product,
            "qty":this.quan,
            "amount":parseFloat(product.price)*this.quan
          })

        }
      }
this.storage.set("cart",data).then(()=>{

  console.log("cart updated");
  console.log(data);
  this.toastCtrl.create({
    message:"cart updated",
    duration:3000
  }).present();
})
    });
  }


  openCart(){
    this.modalCtrl.create(CartPage).present();
  }

}
