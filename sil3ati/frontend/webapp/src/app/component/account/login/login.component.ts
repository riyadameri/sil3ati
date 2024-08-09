import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private http: HttpClient) {}

  showpass(passwordInput: HTMLInputElement) {
    const checkbox = document.querySelector("#togglePassword") as HTMLInputElement;

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    });
  }

  checkpass() {
    this.http.post('http://127.0.0.1:3000/user/login', this.user).subscribe(
      (res: any) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.id);
          localStorage.setItem('username', res.name);
          localStorage.setItem('email', res.email);
          localStorage.setItem('phone', res.phone);
          localStorage.setItem('address', res.address);
          localStorage.setItem('profile_Picture', res.profile_Picture);
          localStorage.setItem('shopOrSupplier', res.shopOrSupplier);
          
          this.router.navigate(['/home']);
          console.log(res);
        } else {
          console.log(res.data.token);
        }
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
