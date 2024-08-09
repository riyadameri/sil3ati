import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'] // Note: 'styleUrls' should be plural, not 'styleUrl'
})
export class NavComponent {

  constructor(private AccountService : UserService){}

  closeBtn() {
    this.toggleSidebar();
  }

  searchBtn() {
    this.toggleSidebar();
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('#btn');
    
    if (sidebar) {
      sidebar.classList.toggle('open');
      this.menuBtnChange(sidebar, closeBtn);
    }
  }

  menuBtnChange(sidebar: Element | null, closeBtn: Element | null) {
    if (sidebar && closeBtn) {
      if (sidebar.classList.contains('open')) {
        closeBtn.classList.replace('fa-bars', 'fa-times');
      } else {
        closeBtn.classList.replace('fa-times', 'fa-bars');
      }
    }
  }

  logOut() {
    this.AccountService.logOut();
  }
}
