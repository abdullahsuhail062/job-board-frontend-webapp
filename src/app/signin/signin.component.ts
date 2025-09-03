import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; 
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { FormErrorHandlerService } from '../services/form-error-handler.service';
import { MatIcon } from '@angular/material/icon';

import { Authservice } from '../services/authservice';








@Component({
  selector: 'app-signin',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, RouterLink, MatIcon],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {
  private formBuilder = inject(FormBuilder);
  loading = false
  hidePassword: boolean = true
constructor(private authService: Authservice,private apiService: ApiService, private router: Router,private formErrorHandlerService: FormErrorHandlerService){}

signinForm = this.formBuilder.group({ email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]]})


  onSubmit(){
    if (this.signinForm.valid) {
      this.isLoadingFn()
      const myData = this.signinForm.value
      
      this.apiService.loginUser(myData).subscribe({next: (response) => {this.router.navigate(['/dashboard'],{ replaceUrl: true });
    const token = response.token;
    
    this.authService.setToken(token)}
  
,
      
      error: (error) =>{
        this.isLoadingFn()
        this.formErrorHandlerService.applyBackendloginUserErrors(this.signinForm, error)}})
      
    }
  }

  isLoadingFn(){
    this.loading = !this.loading
  }

}
