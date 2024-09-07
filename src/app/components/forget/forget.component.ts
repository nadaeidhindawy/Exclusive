import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  msgSuccess: boolean = false;
  msgError: string = "";
  isLoading: boolean = false;

  step: number = 1;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  })

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })


  verifyEmailSubmit(): void {
    let emailValue = this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue)
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  verifyCodeSubmit(): void {
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  resetPasswordSubmit(): void {
    this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token)

        this._AuthService.saveUserData()
        this._Router.navigate(['/home'])
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
