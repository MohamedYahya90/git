import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ProductsDetailsPage } from '../products-details/products-details';

@Component({
  selector: 'page-home1',
  templateUrl: 'home1.html',
  
})
export class Home1Page {
  WooCommerce:any;
  products:any;
  tr :boolean =true;
  moreProducts: any;

  page: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl : ToastController) {

    this.page = 2;
    this.WooCommerce =WC({
      url:"http://localhost/wordpress/",
      consumerKey:"ck_89e0af24c6c9af495255ef1e553f5982c0913504",
      consumerSecret:"cs_1d60189f785ca7ef28b50801fa363fc3e526ecf3",
     
    })
    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then((data) => {
      console.log(JSON.parse(data.body).products);
     this.products = JSON.parse(data.body).products;
      
      }, (err) => {
      console.log(err)
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home1Page');
  }
  loadMoreProducts(event) {
    if(!event) { 
      this.page = 2;
      this.moreProducts = [];
    }
    else { this.page++; }

    this.WooCommerce.getAsync("products?page=" + this.page)
      .then((data) => {
        let moreProducts = JSON.parse(data.body).products;
        this.moreProducts = this.moreProducts.concat(moreProducts);

        if(event) { 
          event.complete(); 
          if(moreProducts.length < 10) { 
            event.enable(false); 

            this.toastCtrl.create({
              message: 'No more products!',
              duration: 1000
            }).present();
          }
        }
      }, (error) => {
        console.log(error);
      });
  }

  openProductPage(product) {
    this.navCtrl.push(ProductsDetailsPage, { product: product });
  }
}
