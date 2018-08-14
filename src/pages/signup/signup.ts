import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
@Component({
 selector: 'page-signup',
 templateUrl: 'signup.html',
})
export class Signup {
 newUser: any = {};

 WooCommerce: any;

 address_2 : "add2";
 postcode :"1234";
 city:"city";

 constructor(public navCtrl: NavController,
 public navParams: NavParams,
 private toastCtrl: ToastController,
 private alertCtrl: AlertController) {
 
 this.newUser.billing_address = {};

 this.WooCommerce = WC({
    url:"http://localhost/wordpress/",
  consumerKey:"ck_ca4cdd896616d6a875e094838fcba91ed457d4c6",
  consumerSecret:"cs_7c2d4cb319dbb03cb7b5251e4298564404b7f1ee",
  queryStringAuth: true
 });
 }
 
 checkEmail(){
 let validEmail = false;
 // Regular expression for valid email
 let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 // Reg test 
 if(reg.test(this.newUser.email)){
 
 //email looks valid
 //
 this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then( (data) => {
 
 console.log(JSON.parse(data.body));
 let res = (JSON.parse(data.body));
 //The API will responde with an error "invalid email"
 // that means the email does not exist if that is true we can use the user
 // email to create a new account
 if(res.errors){
 validEmail = true;
 this.toastCtrl.create({
 message: "Congratulations. Email is good to go.",
 duration: 3000
 }).present();
 } else {
 validEmail = false;
 this.toastCtrl.create({
 message: "Email already registered. Please check.",
 showCloseButton: true
 }).present();
 }
 console.log(validEmail);
 })
 } else {
 validEmail = false;
 this.toastCtrl.create({
 message: "Invalid Email. Please check.",
 showCloseButton: true
 }).present();
 console.log(validEmail);
 }
 }
 signup(){
 let customerData = {
 customer : {}
 }
 customerData.customer = {
 "email": this.newUser.email,
 "first_name": this.newUser.first_name,
 "last_name": this.newUser.last_name,
 "username": this.newUser.username,
 "password": this.newUser.password,
 "billing_address": {
 "first_name": this.newUser.first_name,
 "last_name": this.newUser.last_name,
 "company": "",
 "address_1": this.newUser.billing_address.address_1,
 "address_2": this.address_2,
 "city": this.city,
 "state": this.newUser.billing_address.state,
 "postcode": this.postcode,
 "country": this.newUser.billing_address.country,
 "email": this.newUser.email,
 "phone": this.newUser.billing_address.phone
 },
 "shipping_address": {
 "first_name": this.newUser.first_name,
 "last_name": this.newUser.last_name,
 "company": "",
 "address_1": this.newUser.billing_address.address_1,
 "address_2": this.address_2,
 "city": this.city,
 "state": this.newUser.billing_address.state,
 "postcode": this.postcode,
 "country": this.newUser.billing_address.country,
 }
 }
 
 this.WooCommerce.postAsync('customers', customerData).then( (data) => {
 let response = (JSON.parse(data.body));
 // if the response contains an object called customer
 // then the account has been created
 if(response.customer){
 this.alertCtrl.create({
 title: "Account Created",
 message: "Your account has been created successfully! Please login to proceed.",
 buttons: [{
 text: "Login",
 handler: ()=> {
 //TODO
 }
 }]
 }).present();
 
 } else if(response.errors){
 this.toastCtrl.create({
 message: response.errors[0].message,
 showCloseButton: true
 }).present();
 }
 })
 }
}



// this.WooCommerce.postAsync('customers', customerData).then( (data) => {
//   let response = (JSON.parse(data.body));

//   console.log(JSON.parse(data.body));
// })