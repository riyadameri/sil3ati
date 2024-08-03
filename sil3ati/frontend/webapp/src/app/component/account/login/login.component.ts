import { Component } from '@angular/core';
import { CreateService } from '../../../services/create.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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

  constructor( private http : CreateService , private router: Router){}

  checkpass(){
    this.http.checkpassword(this.user)
      .subscribe((res) => {
        console.log(res);
      },
      (error)=>{
        console.error('error checking password',error);
      }
    );
  }

  

}
