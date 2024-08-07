import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
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
