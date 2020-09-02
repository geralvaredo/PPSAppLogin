import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../shared/user.inteface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorLogin = 'ErrorLogin ->';
  errorVerificationEmailFireBase = 'ErrorVerificationEmailFireBase->';
  errorRegisterFireBase = 'ErrorRegisterFireBase ->';

  constructor(private afAuth: AngularFireAuth, private  router: Router) {
  }

  async login(email: string, password: string): Promise<firebase.User> {
    try {
      const {user} = await this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      console.log(this.errorLogin, error);
    }
  }

  async registerFirebase(email: string, password: string): Promise<firebase.User> {
    try {
      const {user} = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.verificationEmailFirebase();
      return user;
    } catch (error) {
      console.log(this.errorRegisterFireBase, error);
    }
  }

  async verificationEmailFirebase(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log(this.errorVerificationEmailFireBase, error);
    }
  }

  redirectUser(router: string) {
    this.router.navigate([router]);
  }


}
