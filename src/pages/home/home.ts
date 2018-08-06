import { Component,ViewChild } from '@angular/core';
import { NavController,Slides,ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import {ProductDetailsPage} from '../product-details/product-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
     Woocommerce:any;
     products:any[];
     moreProducts:any[];
     
     page:number;
     @ViewChild('productSlides') productSlides:Slides;
     constructor(public navCtrl: NavController, public toastCtrl:ToastController) {
   
       this.page=2;
        this.Woocommerce=WC({
            url:"http://localhost/project",
            consumerKey:"ck_97206fa9aac8d9579c1b73f5895a2f084bca65f5",
            consumerSecret:"cs_7592a43a30c7dfa468b6907d1e08ac77c7e39e08"
        });

        
        
        this.Woocommerce.getAsync("products").then((data)=>{
                this.products=JSON.parse(data.body).products;
             
           this.loadMoreProducts(null);
        },(err)=>{
              console.log(err);
        });
       
  }
  ionViewDidLoad(){
     setInterval(()=>{
          if(this.productSlides.getActiveIndex()==this.productSlides.length()-1){
            this.productSlides.slideTo(0);
            this.productSlides.slideNext();
          }
     },3000)

  }

  loadMoreProducts(event){

  if(event==null){
    this.page=2;
    this.moreProducts=[];
  }
   else
    this.page ++;


  this.Woocommerce.getAsync("products?page="+this.page).then((data)=>{
          this.moreProducts=this.moreProducts.concat(JSON.parse(data.body).products);
       if(event!=null){
            event.complete();
       }
        

       if(JSON.parse(data.body).products.length<10){
          event.enable();
          this.toastCtrl.create({
              message:"No Existen mas productos!",
              duration:4000
          }).present();
       }

    
  },(err)=>{
        console.log(err);
  });


  }



  openProductpage(product){

     this.navCtrl.push(ProductDetailsPage,{"product":product});
  }

}
