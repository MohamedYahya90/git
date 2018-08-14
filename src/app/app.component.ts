import { Home1Page } from './../pages/home1/home1';
import { Orders } from './../pages/orders/orders';
import { Signup } from './../pages/signup/signup';
import { CatPage } from './../pages/cat/cat';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { CartPage } from '../pages/cart/cart';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  loggedIn : boolean;
	user:any;

 

  constructor(public platform: Platform, 
    public storage :Storage,
    public events: Events,
    private oneSignal: OneSignal,
    public modalCtrl :ModalController,
    public menu: MenuController,
    public statusBar: StatusBar,
     public splashScreen: SplashScreen) {
    this.initializeApp();
    this.ionViewDidEnter();
 
    this.user ={};
   
  

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.oneSignal.startInit('84f0da5b-8979-488e-a844-a9977274ecc0', '894499385759');

this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

this.oneSignal.handleNotificationReceived().subscribe(() => {
 // do something when notification is received
});

this.oneSignal.handleNotificationOpened().subscribe(() => {
  // do something when a notification is opened
});

this.oneSignal.endInit();
     
      
    });
  }
  ionViewDidEnter() {
		this.storage.get("userLoginInfo").then((userloginInfo)=>{

			if(userloginInfo != null){

				console.log("user logged in");
				this.user = userloginInfo.user;
				console.log(this.user);
        this.loggedIn = true;
        this.enableMenu(true);
			}
			else{
				console.log("no user found");
				this.user = {};
        this.loggedIn = false;
        this.enableMenu(false);
			}

    })
    
   
  }

 
  openPage(pageName:string) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
	if(pageName == "login"){
			this.nav.push(Login);
  }
  if(pageName == "Orders"){
    this.nav.push(Orders);
  }
  if(pageName == "Home1"){
    this.nav.push(Home1Page);
  }
	if(pageName == "signup"){
    this.nav.setRoot(Signup);
    }
    if(pageName == "cart"){
			let modal = this.modalCtrl.create(CartPage);
			modal.present();
		}
		if(pageName == "cat"){
			this.nav.push(CatPage);
		}
		if(pageName == "logout"){
			this.storage.remove("userLoginInfo").then(() =>{

				this.user ={};
        this.loggedIn = false;
        this.enableMenu(false);
			})
		}	
  }
  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }


}
