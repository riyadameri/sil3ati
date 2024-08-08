import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) {}
  token = localStorage.getItem('token');

  getUserData(id:String):Observable<any>{
    return this.http.get(`http://127.0.0.1:3000/user/getUserDataById/${id}`)
  }

  logOut(){
    localStorage.clear()
    window.location.reload()
    window.location.href = '/login'

  }
  isLogedIn(){
    if(this.token){
      return true
    
    }
    else{
      return false
    }
  }
}
