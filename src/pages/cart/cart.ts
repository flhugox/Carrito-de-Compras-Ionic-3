import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
 

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems:any[]=[];
  total:any;
  showEmptyCartMessage:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
  this.total=0.0;
    this.storage.ready().then(()=>{

           this.storage.get("cart").then((data)=>{
                    this.cartItems=data;
                    console.log(data);
                    if(this.cartItems.length>0){
                       this.cartItems.forEach((item,index)=>{
                           this.total=this.total + (item.product.price*item.qty);
                            
                       })

                    }else{
                        this.showEmptyCartMessage=true;
                    }
           })
    });
  }

  ionViewDidLoad() {
  
  }

}
