import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  
  constructor(private http : HttpClient , private act : ActivatedRoute){}

  ngOnInit(): void {
    this.id= this.act.snapshot.paramMap.get('id');

    

  }
}
