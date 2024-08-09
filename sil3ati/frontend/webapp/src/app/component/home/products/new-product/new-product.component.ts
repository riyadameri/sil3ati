import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  constructor(private http: HttpClient,
    private router : Router 
   ) { }

  product = {
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    image: null as File | null
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
      res => { 
        alert("Product Added Successfully");
        this.router.navigate(['/home'])
      },
      err => {
        console.error("Error occurred:", err);
        alert(`Error: ${err.error?.message || 'Something went wrong'}`);
      }
    );
  }
  


}
