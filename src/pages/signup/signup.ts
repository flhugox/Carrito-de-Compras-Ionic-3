import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})


export class SignupPage {
  newUser: any ={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newUser.billing_address={};
    this.newUser.shipping_address={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
