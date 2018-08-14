import { ProductsDetailsPage } from './../products-details/products-details';

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

/**
 * Generated class for the ProductsByCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {
WooCommerce : any;
products : any[];
page:number;
category :any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.page =1;
    this.category = this.navParams.get("category");

    this.WooCommerce =WC({
      url:"http://localhost/wordpress/",
      consumerKey:"ck_89e0af24c6c9af495255ef1e553f5982c0913504",
  consumerSecret:"cs_1d60189f785ca7ef28b50801fa363fc3e526ecf3",
    })

    this.WooCommerce.getAsync("products?filter[category]="+ this.category.slug).then((data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
      
      }, (err) => {
      console.log(err)
      });
      
      
  }

  loadMoreProducts(event){
    this.page++;
    console.log("Getting"+ this.page);
    this.WooCommerce.getAsync("products?filter[category]="+ this.category.slug+ "&page=" + this.page).then((data) => {
      let temp =(JSON.parse(data.body).products);
      event.complete();

      if(temp.length < 10)
        event.enable(false);
    })
  }
  openProductPage(product){
    this.navCtrl.push(ProductsDetailsPage,{"product":product});          //push show go back 
    
    }
}
