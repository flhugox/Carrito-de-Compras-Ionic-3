import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import {ProductDetailsPage} from '../product-details/product-details';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {
  WooCommerce:any;
  products:any[];
  page:number;
  category:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.page=1;
  this.category=this.navParams.get("category");
    this.WooCommerce=WC({
      url:"http://localhost/project",
      consumerKey:"ck_97206fa9aac8d9579c1b73f5895a2f084bca65f5",
      consumerSecret:"cs_7592a43a30c7dfa468b6907d1e08ac77c7e39e08"
  });
    
  this.WooCommerce.getAsync("products?filter[category]="+this.category.slug).then((data)=>{
    this.products=JSON.parse(data.body).products;

},(err)=>{
  console.log(err);
});


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }


 
  loadMoreProducts(event){

   
      this.page ++;
  
  
    this.WooCommerce.getAsync("products?filter[category]="+this.category.slug+"&page="+this.page).then((data)=>{
      let temp=(JSON.parse(data.body).products);
      this.products=this.products.concat(JSON.parse(data.body).products);
      event.complete();
      if(temp.legth<10){

       event.enable(false);
      }
      
    },(err)=>{
          console.log(err);
    });
  
  
    }


  openProductPage(product){

    this.navCtrl.push(ProductDetailsPage,{'product':product});
 }


}
