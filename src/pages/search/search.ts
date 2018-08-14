import { ProductsDetailsPage } from './../products-details/products-details';
import { Component } from '@angular/core';
import {  NavController, NavParams ,ToastController} from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchQuery:string ="";
  WooCommerce:any;
  products :any[]= [];
  page:number =2;

  constructor(public toastCtrl : ToastController,public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get("searchQuery"));
    this.searchQuery =this.navParams.get("searchQuery");

    this.WooCommerce =WC({
      url:"http://localhost/wordpress/",
      consumerKey:"ck_ca4cdd896616d6a875e094838fcba91ed457d4c6",
      consumerSecret:"cs_7c2d4cb319dbb03cb7b5251e4298564404b7f1ee",
    });

    this.WooCommerce.getAsync("products?filter[q]="+ this.searchQuery).then((searchData)=>{
      this.products = JSON.parse(searchData.body).products;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  loadMoreProducts(event){
    this.WooCommerce.getAsync("products?filter[q]="+ this.searchQuery+ "&page="+ this.page).then((searchData)=>{
      this.products = this.products.concat(JSON.parse(searchData.body).products);

      if(JSON.parse(searchData.body).products.length <10){
        event.enable(false);
        this.toastCtrl.create({
          message: 'No more products!',
          duration: 1000
        }).present();
      }
      event.complete();
      this.page ++;

    });
  }
  openProductPage(product){
    this.navCtrl.push(ProductsDetailsPage,{"product":product});          //push show go back 
    
    }
}
