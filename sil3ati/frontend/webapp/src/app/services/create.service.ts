import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http: HttpClient) { }

  addProfileImage(userImage: any, userId: any) {
    return this.http.put(`http://127.0.0.1:3000/supplier/updateProfilePicture/${userId}`, userImage);
  }

  checkpassword(user:any){
    return this.http.post('http://127.0.0.1:3000/router/user/login',user);
  }

  saveProduct(product:any){
    return this.http.post('http://127.0.0.1:3000/products/addProduct',product)
  }
}
