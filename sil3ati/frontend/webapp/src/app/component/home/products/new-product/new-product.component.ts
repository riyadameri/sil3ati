import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  constructor(private http: HttpClient) { }

  product = {
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    image: null as File | null // Changed to null for file type
  };

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product.image = file;
    }
  }

  save() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('category', this.product.category);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price);
    formData.append('quantity', this.product.quantity);
    if (this.product.image) {
      formData.append('ProductImage', this.product.image);
    }

    this.http.post(
      'http://localhost:3000/products/addProduct', formData,
      {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      }
    ).subscribe(
      res => { alert("Product Added Successfully"); },
      err => { console.log(err); }
    );
  }
}
