import { Component } from '@angular/core';
import { CreateService } from '../../../services/create.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  }

  showpass() {
    let showpassword = document.querySelector(".show") as HTMLInputElement;
    let checkbox = document.querySelector("#togglePassword") as HTMLInputElement;

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            showpassword.type = "text";
        } else {
            showpassword.type = "password";
        }
    });
  }

  constructor( private router: Router , private http : HttpClient){}

  checkpass() {
    this.http.post('http://127.0.0.1:3000/user/login', this.user).subscribe(
      (res: any) => {
        if (res.body.success) {
          const token = res.headers.get("Authorization")
          if(token){
            localStorage.setItem('token', token);
          }
          this.router.navigate(['home']);
          console.log(res);
          localStorage.setItem('token', JSON.stringify(res.data));
        } else {
          alert('Wrong Email or Password');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }


}
