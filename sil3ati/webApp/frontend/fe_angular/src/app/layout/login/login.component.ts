import { Component } from '@angular/core';
import {faGithubAlt} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  faGithubAlt = faGithubAlt;
  myBackground:String = '/src/assets/login/background.jpg'

}
