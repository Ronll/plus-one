import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  windowRef: any;

  verificationCode: string;

  phoneNumber: string;

  showUsernameInput: boolean;

  user: any;

  myUID: string;

  showSignInForm: boolean
  
  showLoggedInMessage: boolean

  constructor(
    public afAuth: AngularFireAuth, 
    private win: WindowService,
    private router: Router,
    private db: AngularFireDatabase,
  ) { this.showSignInForm = false }

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
                    if(result.additionalUserInfo.isNewUser){
                      this.showUsernameForm()
                    }else{
                      this.router.navigate(['/scores'])
                    }
                  })
                  .catch( error => console.log(error, "Incorrect code entered?"));
  }

  assignUsername(username){
    this.myUID = this.afAuth.auth.currentUser.uid
    var userObj = {uid: this.myUID, username: username}
    this.db.list(`/users`).set(this.myUID, userObj)
    this.router.navigate(['/scores'])
  }

  showUsernameForm(){
    this.showUsernameInput = true;
  }

  ngOnInit(){
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.showLoggedInMessage = true
        this.router.navigate(['/scores'])        
      } else {
        this.showSignInForm = true
        this.windowRef = this.win.windowRef
        this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', 
                                                                                {'size': 'invisible'})
        this.windowRef.recaptchaVerifier.render()
      }
    })
  }

}
