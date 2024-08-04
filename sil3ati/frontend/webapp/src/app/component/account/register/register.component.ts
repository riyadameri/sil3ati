import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http: HttpClient, private router: Router) {}

  public getJsonValue: any;
  public postJsonValue: any;
  public confirmId: any;
  public userId : any ;

  isAccountExist = false;
  inputKey = false;
  confirmPage = false;

  user = {
    email: '',
    password: '',
    confirmPass: '',
    name: '',
    phone: '',
    address: '',
    birthday: '',
    key: ''
  };

  confirmAccount() {
    this.http.post(`http://127.0.0.1:3000/supplier/confirm/${this.confirmId}`, this.user).subscribe(
      (res: any) => {
        if (res.success) {
          this.router.navigate(['success-register'])
          this.userId = res.data._id ;
          localStorage.setItem('userAccountId',`${this.userId}`)

        } else {
          this.router.navigate(['/confirmation-failure']);
        }
      },
      (error) => {
        setTimeout(() => {
          this.router.navigate(['/confirmation-failure']);
        }, 200000);
      }
    );
  }

  confirm() {
    const errorEmail = document.querySelector('.errorEmail');
    const demo = document.querySelector('.demo');

    if (this.user.email === '') {
      errorEmail?.classList.add('error');
      demo?.classList.add('ERRmail');
    } else {
      errorEmail?.classList.remove('error');
      demo?.classList.remove('ERRmail');

      if (this.user.password.length <= 8) {
        demo?.classList.add('ERRpass');
      } else {
        demo?.classList.remove('ERRpass');

        if (this.user.password !== this.user.confirmPass) {
          demo?.classList.add('ERRconf');
        } else {
          demo?.classList.remove('ERRconf');

          document.querySelector('.register')?.classList.toggle('activeleft');
          document.querySelector('.create')?.classList.toggle('activeright');
          document.querySelector('.wrapper')?.classList.add('small');
        }
      }
    }
  }

  reverss() {
    const register = document.querySelector('.register');
    const create = document.querySelector('.create');
    const wrapper = document.querySelector('.wrapper');

    document.querySelector('.revers')?.addEventListener("click", function () {
      register?.classList.remove('activeleft');
      create?.classList.remove('activeright');
      wrapper?.classList.remove('small');
    });
  }

  postMethode() {
    this.http.post('http://127.0.0.1:3000/supplier/newAccount', this.user).subscribe(
      (data: any) => {
        this.postJsonValue = data;
        this.confirmId = data.confirmId;
        this.isAccountExist = false;
        this.confirmAccount();
        this.inputKey = true;
      },
      (error) => {
        console.error(error);
        this.isAccountExist = true;
      }
    );
  }

  register() {
    this.postMethode();
  }
}
