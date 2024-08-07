import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  items = [
    {  image:'assets/434096415_1127376984952446_3745839893712808449_n.jpg',name: 'Product 1', price: 10, quantity: 30, Description:'white shoes' },
    {  image:'assets/background.jpg' ,name: 'Product 2', price: 20, quantity: 40, Description:'blue shoes' }
  ]

  constructor (private http : HttpClient){}
  token = localStorage.getItem('token')
  products: any[] = [];

  

  ngOnInit () {
    this.http.get<any>("http://localhost:3000/products/getProducts",
     //{headers: {'Authorization' : `${this.token}`}},
    ).subscribe(res => {
      this.products = res.data;    }
  );
  }


}
