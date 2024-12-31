import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { JwtService } from '../../services/jwt.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../Entitys/role';
import { User } from '../../Entitys/user';
import { NgFor } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule,
    ReactiveFormsModule,
    NgFor,
    NavbarComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  registerForm!: FormGroup;

  roles: Role[] = [
    { name: 'ADMIN', id: 1 },
    { name: 'USER', id: 2 }];

  constructor(private service: JwtService,
    private fb: FormBuilder,
  private router: Router) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      role: this.fb.group({
        id: [1, Validators.required],
        name: ['', Validators.required]
      })
    }, { validators: this.passwordMathValidator })
  }

  passwordMathValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;

    if (password != repeatPassword) {
      formGroup.get('repeatPassword')?.setErrors({ passwordMismatch: true })
    }
    else {
      formGroup.get('repeatPassword')?.setErrors(null)
    }
  }

  submitForm() {

    const selectedRoleName = this.registerForm.get('role.name')?.value;

    if (selectedRoleName === 'ADMIN') {
      this.registerForm.get('role.id')?.setValue('1');
    } else if (selectedRoleName === 'USER') {
       this.registerForm.get('role.id')?.setValue('2');
      }

    const formData = { ...this.registerForm.value };
    delete formData.repeatPassword;

    console.log(formData);

    this.service.register(formData as User).subscribe((response: any) => {
      console.log(response);
      this.router.navigateByUrl('/home');
    },
      (error: any) => {
        console.error(error);
      });
  }
}
