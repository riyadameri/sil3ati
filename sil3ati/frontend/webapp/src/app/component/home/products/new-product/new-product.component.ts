import { Component } from '@angular/core';
import { CreateService } from '../../../../services/create.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  product = {
    name: '',
    category:'',
    description: '',
    price: '',
    quantity:'',
    image: ''
  }

  Save(){
    this._shared.saveProduct(this.product).subscribe(
      res=>{
        console.log(res),
        console.log(this.product)
      },
      err=>{
        console.log(err)
      }
    )
  }

  constructor( private _shared: CreateService){}
  
}
