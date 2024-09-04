import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    try {
      const { password, email } = this.loginForm.value;
      const subscription = this.authService
        .login(email as string, password as string)
        .subscribe((data) => {
          this.router.navigate(['/dashboard']);
        });
    } catch (error) {
      console.log(error);
    }
  }
}
