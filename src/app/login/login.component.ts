import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.initLoginForm();
  }
  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.loginForm.valid) {
      // Step 1: Get a request token
      this.authService.getRequestToken().subscribe((requestTokenData) => {
        const requestToken = requestTokenData.request_token;

        // Step 2: Login with shared credentials using the request token
        this.authService.loginSharedCredentials(requestToken, this.loginForm.value.username, this.loginForm.value.password).subscribe(
          (loginData) => {
            console.log(loginData);
            sessionStorage.setItem('loginData', JSON.stringify(loginData))
            this.authService.createSession(requestToken).subscribe(
              (sessionData) => {
                // Session created, you can now store the session ID or perform further actions
                sessionStorage.setItem('sessionData',JSON.stringify(sessionData) )

                console.log('Session created:', sessionData);
                this.authService.getAccountDetails(sessionData.session_id).subscribe(
                  (res)=>{
                    console.log(res);
                    sessionStorage.setItem('account',JSON.stringify(res))
                  },
                  (err)=>{
                    console.log(err);
                    
                  }
                )
                setTimeout(()=> this.router.navigate(['movie']),1000)
              },
              (sessionError) => {
                console.error('Session creation error:', sessionError);
              }
            );
          },
          (loginError) => {
            // Handle login error
            console.error('Login error:', loginError);
          }
        );
      });
    }
  }
}
