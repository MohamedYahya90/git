import { ProductsByCategoryPage } from './../products-by-category/products-by-category';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

/**
 * Generated class for the CatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-cat',
  templateUrl: 'cat.html',
})
export class CatPage {
  WooCommerce:any;
  categories:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categories = [];


    this.WooCommerce =WC({
      url:"http://localhost/wordpress/",
      consumerKey:"ck_89e0af24c6c9af495255ef1e553f5982c0913504",
      consumerSecret:"cs_1d60189f785ca7ef28b50801fa363fc3e526ecf3",
      
    })
    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);
      
     let temp:any[] =JSON.parse(data.body).product_categories;

     for(let i =0; i< temp.length; i ++){
       if(temp[i].parent ==0){

            if(temp[i].slug =="clothing"){
              temp[i].icon = "shirt";
            }
            if(temp[i].slug =="music"){
              temp[i].icon = "musical-notes";
            }
            if(temp[i].slug =="posters"){
              temp[i].icon = "images";
            }

         this.categories.push(temp[i]);
       }
     }
      
      }, (err) => {
      console.log(err)
      });  
      }


      openCategoryPage(category){

        this.navCtrl.push(ProductsByCategoryPage,{"category":category})
      }
  }

 


