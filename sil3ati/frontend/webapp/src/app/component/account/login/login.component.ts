import { Component } from '@angular/core';
import { CreateService } from '../../../services/create.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { HttpClient  , HttpHeaders} from '@angular/common/http';

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
        if (res.success) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.id);
          localStorage.setItem('username',res.name);
          localStorage.setItem('email',res.email);
          localStorage.setItem('phone',res.phone);
          localStorage.setItem('address',res.address);
          localStorage.setItem('profile_Picture',res.profile_Picture);
          localStorage.setItem('shopOrSupplier',res.shopOrSupplier);
          
          this.router.navigate(['/home']);
          console.log(res)
        } else {
          console.log(res.data.token);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
