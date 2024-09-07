
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);


  msgSuccess: boolean = false;
  msgError: string = "";
  isLoading: boolean = false;



  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],

  },)



  loginSubmit(): void {
    // -----------logic
    if (this.loginForm.valid) {
      this.isLoading = true;

      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        // ----action res message success --->login
        next: (res) => {
          console.log(res)

          if (res.message == 'success') {

            // 1-save token
            localStorage.setItem('userToken', res.token)

            // 2-Dcode token
            this._AuthService.saveUserData()

            // 3-navigate to home
            this.msgSuccess = true;
            setTimeout(() => {
              this._Router.navigate(['/home'])
            }, 2000);
          }
          this.isLoading = false;
        },

        //   err ---->   show error html user
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message
          console.log(err)
          this.isLoading = false;
        }



      })
    }

    else {
      this.loginForm.setErrors({ mismatch: true })
      this.loginForm.markAllAsTouched()
    }




  }

}
