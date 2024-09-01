import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.formBuilder.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    },
  );

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}


  onSubmit() {
    console.log(this.loginForm.value);
  }
}
