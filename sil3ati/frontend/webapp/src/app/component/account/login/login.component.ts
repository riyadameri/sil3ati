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

  constructor( private _shared : CreateService , private router: Router){}

  checkpass() {
    this._shared.checkpassword(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/home']);
          alert('Login successfully');
        },
        error => {
          console.log('Error checking password:', error);
          this.router.navigate(['/failure-register']);
          alert('Login failed: ' + error.message);
        }
      );
  }




  

}
