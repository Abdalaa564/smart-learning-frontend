import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
loginData= {
  email:'',
  password:''
} 
onSubmit(){
  alert(`Email: ${this.loginData.email}\nPassword: ${this.loginData.password}`);
}
}
