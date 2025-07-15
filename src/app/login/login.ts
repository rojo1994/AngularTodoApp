import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../auth/auth';
import { Router } from '@angular/router';
import { LoginFG } from '../interfaces/login.interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [MatInputModule,MatFormFieldModule, MatButtonModule, MatCardModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{

  loginFG!: FormGroup<LoginFG>;

  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);

  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.loginFG = new FormGroup({
      username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
    });
  }


  onSubmit() {
    if (this.loginFG.invalid) {
      this.loginFG.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginFG.getRawValue();

    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.access_token);
        this.router.navigate(['/tasks']);
      },
      error: () => {
         this.error.set('Credenciales inválidas')
      }
    });
  }



}
