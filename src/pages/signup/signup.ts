import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})


export class SignupPage {
  newUser: any ={};
  billing_shipping_same:boolean;
  Woocommerce:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController) {
    this.newUser.billing_address={};
    this.newUser.shipping_address={};
    this.billing_shipping_same=false;
    this.Woocommerce=WC({
      url:"http://localhost/project",
      consumerKey:"ck_97206fa9aac8d9579c1b73f5895a2f084bca65f5",
      consumerSecret:"cs_7592a43a30c7dfa468b6907d1e08ac77c7e39e08"
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  setbillingToShipping(){
   console.log("Test");
  this.billing_shipping_same=!this.billing_shipping_same;
  }

   checkEmail(){
 
    let validEmail = false;
 
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //Valida si tiene @ y esas cosas
    if(reg.test(this.newUser.email)){
      //se valida Correctgamente y pasa a hacer la peticion ajax
      //Envia el correo ingresado
      this.Woocommerce.getAsync("customers/email/" + this.newUser.email).then( (data) => {
        let res = (JSON.parse(data.body));
        // si el array(res) devuelve vacio no existe+
      
  
        if(res.errors){
          validEmail = true;
 
           this.toastCtrl.create({
            message: "Felicidades. El email es correcto",
            duration: 3000
          }).present(); 
        } else {
          //El Email  Si Existe
          validEmail = false;
 
          this.toastCtrl.create({
            message: "El Email ya se encuentra registrado Please check.",
            showCloseButton: true
          }).present();
        }
 
        console.log(validEmail);
 
      })
 
    } else {
      validEmail = false;
     this.toastCtrl.create({
        message: "Email invalido.",
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
        "address_2": this.newUser.billing_address.address_2,
        "city": this.newUser.billing_address.city,
        "state": this.newUser.billing_address.state,
        "postcode": this.newUser.billing_address.postcode,
        "country": this.newUser.billing_address.country,
        "email": this.newUser.email,
        "phone": this.newUser.billing_address.phone,
      },
      "shipping_address": {
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "company": "",
        "address_1": this.newUser.shipping_address.address_1,
        "address_2": this.newUser.shipping_address.address_2,
        "city": this.newUser.shipping_address.city,
        "state": this.newUser.shipping_address.state,
        "postcode": this.newUser.shipping_address.postcode,
        "country": this.newUser.shipping_address.country,
      }
    }


    
    if(this.billing_shipping_same){
      this.newUser.shipping_address = this.newUser.shipping_address;
    }

    this.Woocommerce.postAsync('customers', customerData.customer).then( (data) => {
 
    })
  }
 
}
