import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { JwtService } from '../../services/jwt.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  submitForm() {

    console.log(this.loginForm.value);

    this.service.login(this.loginForm.value).subscribe(
      (response: any) => {
        console.log(response);

        if (response.jwtToken != null) {
          console.log(response.jwtToken)
          const jwToken = response.jwtToken;
          localStorage.setItem('jwt', jwToken);

          this.router.navigateByUrl('/home');
        }
      }
    )

  }
}
