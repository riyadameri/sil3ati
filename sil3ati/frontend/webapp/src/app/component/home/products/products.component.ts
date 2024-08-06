import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  items = [
    {  name: 'Product 1', price: 10, quantity: 30, Description:'white shoes' },
    {  name: 'Product 2', price: 20, quantity: 40, Description:'blue shoes' }
  ]
}
