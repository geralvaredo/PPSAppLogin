import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLogged = 'admin';
  isLogin = 'login';
  errorLogin = false;


  constructor(private authServ: AuthService) {
  }

  ngOnInit() {
  }

  async onLogin(email, password) {
    try {
      const user = await this.authServ.login(email.value, password.value);
      if (user) {
        this.authServ.redirectUser(this.isLogged);
      } else {
        this.errorLogin = true;
        this.authServ.redirectUser(this.isLogin);
      }
    } catch (error) {
      console.log('ErrorOnlogin->', error);
    }
  }


}
