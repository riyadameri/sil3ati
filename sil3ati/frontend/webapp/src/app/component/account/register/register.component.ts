import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  password=''
  confirmPass=''
  email=''

  //confirm password and toggle to second page
  confirm(){
    const pass = document.querySelector('.confPass');
    const register = document.querySelector('.register');
    const confPass = document.querySelector('.pass');
    const create = document.querySelector('.create');
    const wrapper = document.querySelector('.wrapper');
    const errorEmail = document.querySelector('.errorEmail')
    const demo = document.querySelector('.demo');
    if (this.email == ''){
      errorEmail?.classList.add('error');
      demo?.classList.add('ERRmail');
    }else{
      errorEmail?.classList.remove('error');
      demo?.classList.remove('ERRmail');
      if(this.password.length<=8){
        confPass?.classList.add('error');
        demo?.classList.add('ERRpass');
      }else{
        confPass?.classList.remove('error');
        demo?.classList.remove('ERRpass');
        if(this.password != this.confirmPass){
          pass?.classList.add('error');
          demo?.classList.add('ERRconf')
        }
        else{
          register?.classList.toggle('activeleft');
          pass?.classList.remove('error');
          demo?.classList.remove('ERRconf')
          create?.classList.toggle('activeright');
          wrapper?.classList.add('small');
        }
      }
    }
  }

  reverss(){
    const register = document.querySelector('.register');
    const create = document.querySelector('.create');
    const wrapper = document.querySelector('.wrapper');
    const revers = document.querySelector('.revers');

    revers?.addEventListener("click",function(){
      register?.classList.remove('activeleft');
      create?.classList.remove('activeright');
      wrapper?.classList.remove('small');
    })
  }

}
