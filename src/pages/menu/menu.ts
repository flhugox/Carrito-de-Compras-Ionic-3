import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {SignupPage} from '../signup/signup';
import * as WC from 'woocommerce-api';
import {ProductsByCategoryPage} from '../products-by-category/products-by-category';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openCategoryPage(category){
           this.childNavCtrl.setRoot(ProductsByCategoryPage,{"category":category});
  }

  openPage(pageName:string){
    if (pageName == "signup") {
      this.navCtrl.push('Signup');
    }

  }

}
/////
/////