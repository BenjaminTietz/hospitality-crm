import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup | any;
  firebaseErrorMessage: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {
    this.firebaseErrorMessage = '';
   }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'displayName': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

    signup() {
      if (this.signupForm.invalid) 
        return;

        this.authService.signupUser(this.signupForm.value).then((result: any) => {
          if (result == null) 
            this.router.navigate(['/dashboard']);
            else if (result.isValid == false) 
              this.firebaseErrorMessage = result.message;
          }).catch((error: any) => { 
          
          });
    }
  }




