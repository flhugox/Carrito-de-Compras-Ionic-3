import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public toastCtrl:ToastController) {
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
       if(data==null || data.length==0){

            data=[];
            data.push({
              "product":product,
              "qty":1,
              "amount":parseFloat(product.price)

            });


       }else{

            let added=0;
            for(let i=0; i<data.length; i++){

              if(product.id==data[i].product.id){
                  console.log("Producto Existe");
                  let qty=data[i].qty;
                  data[i].qty= qty+1;
                  data[i].amount= parseFloat(data[i].amount)+parseFloat(data[i].product.price);
                  added=1;
                  
              }

            }

            if(added==0){
              data.push({
                "product":product,
                "qty":1,
                "amount":parseFloat(product.price)
  
              });
            }

       }
       this.storage.set("cart",data).then(()=>{
              console.log("Carit0 Updated");
              console.log(data);
              this.toastCtrl.create({
                  message:"Carrito Actualizado",
                  duration:3000
              }).present();
       });
     });
  }

  
}
