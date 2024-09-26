import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoader = false;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const { password, email } = this.loginForm.value;
    if (!email || !password) return;
    localStorage.removeItem('authToken');
    this.isLoader = true;
    const subscription = this.authService
      .login(email as string, password as string)
      .subscribe(
        (data) => {
          localStorage.setItem('authToken', data.token);
          this.router.navigate(['../dashboard']);
          this.isLoader = false;
        },
        (e) => {
          this.isLoader = false;
          console.log(e.error.message);
          this.notificationService.hideAllNotifications();
          this.notificationService.showNotification('error', e.error.message);
        }
      );
  }
}
