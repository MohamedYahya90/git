import { Home1Page } from './../pages/home1/home1';
import { SearchPage } from './../pages/search/search';
import { Orders } from './../pages/orders/orders';
import { Login } from './../pages/login/login';
import { ProductsByCategoryPage } from './../pages/products-by-category/products-by-category';
import { ProductsDetailsPage } from './../pages/products-details/products-details';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {CatPage} from '../pages/cat/cat';
import { OneSignal } from '@ionic-native/onesignal';
import {HttpModule} from '@angular/http';

import {CartPage} from"../pages/cart/cart"
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Signup } from '../pages/signup/signup';
import { Checkout } from './../pages/checkout/checkout';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CatPage,
    ProductsDetailsPage,
    ProductsByCategoryPage,
    CartPage,
    Signup,
    Login,
    SearchPage,
  Checkout,
  Orders,
  Home1Page

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CatPage,
    ProductsDetailsPage,
    ProductsByCategoryPage,
    CartPage,
    Signup,
    Login,
  Checkout,
  SearchPage,
  Orders,
  Home1Page

  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal ,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
