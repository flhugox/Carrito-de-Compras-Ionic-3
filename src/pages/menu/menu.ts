import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,NavParams, ModalController, Events  } from 'ionic-angular';
import {HomePage} from '../home/home';

import * as WC from 'woocommerce-api';
import {ProductsByCategoryPage} from '../products-by-category/products-by-category';
import {SignupPage} from '../signup/signup';
import { Storage } from '@ionic/storage';
import { LoginPage} from '../login/login';
import { CartPage } from '../cart/cart';



@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
homePage:any;
Woocommerce:any;
categories=[];
//Navegar ede jomáge
@ViewChild('content') childNavCtrl:NavController;
loggedIn:boolean;
user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController, private events: Events) {
    this.homePage=HomePage;
    this.Woocommerce=WC({
      url:"http://localhost/project",
      consumerKey:"ck_97206fa9aac8d9579c1b73f5895a2f084bca65f5",
      consumerSecret:"cs_7592a43a30c7dfa468b6907d1e08ac77c7e39e08"
  });



  this.Woocommerce.getAsync("products/categories").then((data)=>{
         console.log(JSON.parse(data.body).product_categories);
         let temp:any[]=JSON.parse(data.body).product_categories;
         for(let i=0;i<temp.length; i++){
           if(temp[i].parent==0){
                  if(temp[i].slug=="clothing"){
                        temp[i].icon="shirt";
                  }
           }
              this.categories.push(temp[i]);
         }
  },(err)=>{

           console.log(err);
  });

  }

  ionViewDidEnter() {
    this.storage.ready().then(() => {
      //recuperamos la informacion del login de storage
      this.storage.get("userLoginInfo").then((userLoginInfo) => {
   // si no hay dato de usuario
        if (userLoginInfo != null) {

          console.log("User logiado ...");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        }
        else {
          console.log("No user found.");
          this.user = {};
          this.loggedIn = false;
        }

      })
    })

    
  }

  openCategoryPage(category){
           this.childNavCtrl.setRoot(ProductsByCategoryPage,{"category":category});
  }

  openPage(pageName:string){
    console.log("Entra");
    if (pageName == "singup") {
   
      this.navCtrl.push(SignupPage);
    }

    if (pageName == "login") {
      this.navCtrl.push(LoginPage);
    }
    if (pageName == 'logout') {
      this.storage.remove("userLoginInfo").then(() => {
        this.user = {};
        this.loggedIn = false;
      })
    }
    if (pageName == 'cart') {
      let modal = this.modalCtrl.create(CartPage);
      modal.present();
    }


  }

}
/////
/////