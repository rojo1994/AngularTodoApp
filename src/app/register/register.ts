import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterFG, userPost } from '../interfaces/register.interfaces';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../auth/auth';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [MatInputModule,MatFormFieldModule, MatButtonModule, MatCardModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{

  registerFG!: FormGroup<RegisterFG>;
  toastr = inject(ToastrService);
  authService = inject(Auth);
  private readonly router = inject(Router);

  readonly error = signal<string | null>(null);

  ngOnInit(): void {
      this.initForms();
  }

  initForms() {
    this.registerFG = new FormGroup({
      username: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
    })
  }

  onSubmit() {
    const { username, password } = this.registerFG.controls;

    const body: userPost = {
      username: username.value,
      password: password.value
    }
    
    this.authService.register(body).subscribe({
      next: (res) => {
        this.toastr.success(`El usuario se registro con exito`, 'Registro de usuarios');
        this.router.navigate(['/login']);
      },
      error : (e) => {
        this.error.set("Hubo un eror al registrar el usuario ");
      }
    })
  }

}
