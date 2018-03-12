import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  windowRef: any;

  verificationCode: string;

  phoneNumber: string;

  user: any;

  constructor(public afAuth: AngularFireAuth, private win: WindowService) {}

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;

    this.afAuth.auth.signInWithPhoneNumber(this.phoneNumber, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }
  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    this.user = result.user;

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', 
                                                                            {'size': 'invisible'})

    this.windowRef.recaptchaVerifier.render()
  }

}
