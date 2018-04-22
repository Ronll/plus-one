import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  windowRef: any;

  verificationCode: string;

  username: string;

  phoneNumber: string;

  showUsernameInput: boolean;

  user: any;

  myUID: string;

  showSignInForm: boolean

  showLoggedInMessage: boolean

  phoneNumberFormGroup: FormGroup;

  codeFormGroup: FormGroup;

  usernameAssigmentFormGroup: FormGroup;

  smsSpinner: boolean = false;

  readonly phoneNumberRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

  constructor(
    public afAuth: AngularFireAuth,
    private win: WindowService,
    private router: Router,
    private db: AngularFireDatabase,
    private formBuilder: FormBuilder,
  ) {
    this.showSignInForm = false
  }

  sumbitPhoneNumber(smsstepper: MatStepper) {
      this.smsSpinner = true;

      this.signinRequest()
        .then(() => {
          smsstepper.next()
          this.smsSpinner = false
        })
        .catch(() => this.smsSpinner = false)
  }

  signinRequest() {
    const appVerifier = this.windowRef.recaptchaVerifier;

    return this.afAuth.auth.signInWithPhoneNumber(this.phoneNumber, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(error => console.log(error));
  }

  sumbitSMSCode(mainstepper: MatStepper, codeform: FormGroup) {
    this.verifySMScodeRequest()
      .then(result => {
        this.user = result.user;
        if (result.additionalUserInfo.isNewUser) {
          mainstepper.next()
        } else {
          this.router.navigate(['/scores'])
        }
      })
  }

  verifySMScodeRequest() {
    return this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .catch(error => console.log(error, "Incorrect code entered?"));
  }

  submitUsername(){
    this.assignUsername(this.username)
    this.router.navigate(['/scores'])    
  }

  assignUsername(username) {
    this.myUID = this.afAuth.auth.currentUser.uid
    var userObj = { uid: this.myUID, username: username }
    this.db.list(`/users`).set(this.myUID, userObj)
  }

  showUsernameForm() {
    this.showUsernameInput = true;
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.showLoggedInMessage = true
        this.router.navigate(['/scores'])
      } else {
        this.showSignInForm = true
        this.windowRef = this.win.windowRef
        this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',
          { 'size': 'invisible' })
        this.windowRef.recaptchaVerifier.render()
      }
    })

    this.phoneNumberFormGroup = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneNumberRegEx)]]
    });
    this.codeFormGroup = this.formBuilder.group({
      code: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]]
    });
    this.usernameAssigmentFormGroup = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

}
