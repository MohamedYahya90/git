import { SearchPage } from './../search/search';
import { ProductsDetailsPage } from './../products-details/products-details';
import { Component,ViewChild } from '@angular/core';
import { NavController,Slides,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import * as WC from 'woocommerce-api';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loggedIn : boolean;
	user:any;
  WooCommerce:any;
  products:any;
  page : number;
  moreProducts:any;
  searchQuery:string = "";

@ViewChild('productSlides') productSlides: Slides;


  constructor(public toastCtrl : ToastController, public storage :Storage,public navCtrl: NavController) {
this.page=2;
//this.ionViewDidEnter();
this.WooCommerce =WC({
  url:"http://localhost/wordpress/",
  consumerKey:"ck_89e0af24c6c9af495255ef1e553f5982c0913504",
  consumerSecret:"cs_1d60189f785ca7ef28b50801fa363fc3e526ecf3",
 // queryStringAuth: true
})
this.loadMoreProducts(null);

this.WooCommerce.getAsync("products").then((data) => {
  console.log(JSON.parse(data.body).products);
  this.products = JSON.parse(data.body).products;
  
  }, (err) => {
  console.log(err)
  });
  
  }

  
ionViewDidLoad(){
setInterval(()=>{
if(this.productSlides.getActiveIndex()== this.productSlides.length() -1)
this.productSlides.slideTo(0);
this.productSlides.slideNext();

},3000)


}
ionViewDidEnter() {
  this.storage.get("userLoginInfo").then((userloginInfo)=>{

    if(userloginInfo != null){

      console.log("user logged in");
      this.user = userloginInfo.user;
      console.log(this.user);
      this.loggedIn = true;
    }
    else{
      console.log("no user found");
      this.user = {};
      this.loggedIn = false;
    }

  })
 
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

openProductPage(product){
this.navCtrl.push(ProductsDetailsPage,{"product":product});          //push show go back 

}

onSearch(event){
  if(this.searchQuery.length >0){
    this.navCtrl.push(SearchPage , {"searchQuery": this.searchQuery})
  }
}

}
