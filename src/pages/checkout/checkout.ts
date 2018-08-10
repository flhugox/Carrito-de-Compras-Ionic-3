import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;
  WooCommerce:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage :Storage) {
    this.newOrder = {};
    this.newOrder.customer = {};
    this.newOrder.customer.billing_address = {};
    this.newOrder.customer.shipping_address = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      { method_id: "bacs", method_title: "Transferencia Bancaria" },
      { method_id: "cheque", method_title: "Cheque" },
      { method_id: "cod", method_title: "Efectivo" },
      { method_id: "paypal", method_title: "PayPal" }];

      this.WooCommerce=WC({
        url:"http://localhost/project",
        consumerKey:"ck_97206fa9aac8d9579c1b73f5895a2f084bca65f5",
        consumerSecret:"cs_7592a43a30c7dfa468b6907d1e08ac77c7e39e08"
    });


    
    this.storage.get("userLoginInfo").then((userLoginInfo) => {

      this.userInfo = userLoginInfo.user;

      let email = userLoginInfo.user.email;
      let id = userLoginInfo.user.id;

      this.WooCommerce.getAsync("customers/"+id).then((data) => {

        this.newOrder = JSON.parse(data.body);
        console.log(this.newOrder.customer.email);
        
   
      })

    })

    



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      console.log(this.newOrder.customer.billing_address.first_name);
     
      this.newOrder.shipping_address = this.newOrder.billing_address;
    }

  }

  placeOrder(){
    console.log("----");
  }



}
