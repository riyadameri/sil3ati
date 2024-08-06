import { Component, OnInit } from '@angular/core';
import { CreateService } from '../../../../services/create.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  editProduct = {
    name:'',
    category:'',
    price:0,
    quntity:0,
    describtion:''
  }

  id:any;

  update(){
    
  }

  
  constructor(private _shared : CreateService , private act : ActivatedRoute){}

  ngOnInit(): void {
    this.id= this.act.snapshot.paramMap.get('id')
  }
}
