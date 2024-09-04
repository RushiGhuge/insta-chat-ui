import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  subscribtion: Subscription[] = [];

  registerForm = this.formBuilder.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required, Validators.minLength(6)],
      gender: [Validators.required],
    },
    {
      validator: this.passwordMatchValidator,
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    public authservice: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    const password = form?.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    try {
      const { password, name, email, gender } = this.registerForm.value;
      const subscription = this.authservice
        .registerUser({ password, name, email, gender })
        .subscribe((data) => {
          this.router.navigate(['/dashboard']);
        });
      this.subscribtion.push(subscription);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribtion.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
