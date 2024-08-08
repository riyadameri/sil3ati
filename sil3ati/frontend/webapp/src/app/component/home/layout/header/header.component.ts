import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  id: string | null = null;
  name: string | null = null;
  location: string | null = null;
  image: string | null = null;
  imageUrl: SafeUrl = '';
  isUserLogin = false;

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.name = localStorage.getItem('username');
    this.location = localStorage.getItem('address');
    this.image = localStorage.getItem('profile_Picture');

    if (this.id) {
      this.isUserLogin = true;
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/uploads/${this.image?.substring(30)}`);
    }
  }

  logOut() {
    this.userService.logOut();
    this.isUserLogin = false;
    this.name = null;
    this.location = null;
    this.image = null;
    this.imageUrl = '';
  }
}
