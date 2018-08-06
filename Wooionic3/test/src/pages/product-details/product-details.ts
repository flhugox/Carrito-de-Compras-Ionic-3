import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product:any=0;
  WooCommerce:any;
 
  reviews:any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
    this.product=this.navParams.get("product");
    console.log(this.product);
    this.WooCommerce=WC({
      url:"http://localhost/project",
      consumerKey:"ck_97206fa9aac8d9579c1b73f5895a2f084bca65f5",
      consumerSecret:"cs_7592a43a30c7dfa468b6907d1e08ac77c7e39e08"
  });

  this.WooCommerce.getAsync('products/'+this.product.id+'/reviews').then((data)=>{
    this.reviews=JSON.parse(data.body).product_reviews;
    console.log(data.body);
  },(err)=>{
       console.log(err);
  });

  }


  addToCart(product){
     this.storage.get("cart").then((data)=>{
       console.log(data);
     })
  }

  
}
