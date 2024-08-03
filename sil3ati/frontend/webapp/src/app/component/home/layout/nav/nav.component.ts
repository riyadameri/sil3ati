import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  closeBtn(){
    let sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("open");
    menuBtnChange();

    function menuBtnChange(){
      let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      if(sidebar?.classList.contains("open")){
        closeBtn?.classList.replace("fa-bars", "fa-times");
      }else{
        closeBtn?.classList.replace("fa-times", "fa-bars");
      }
    }
  }

  searchBtn(){
    let sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("open");
    menuBtnChange();

    function menuBtnChange(){
      let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      if(sidebar?.classList.contains("open")){
        closeBtn?.classList.replace("fa-times", "fa-bars");
      }else{
        closeBtn?.classList.replace("fa-bars", "fa-times");
      }
    }
  }
  
  

  

   
}
