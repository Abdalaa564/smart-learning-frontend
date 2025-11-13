import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,RouterModule ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
registerData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

onRegister() {
  if (this.registerData.password === this.registerData.confirmPassword) {
    alert(`Registration Successful!\nName: ${this.registerData.name}\nEmail: ${this.registerData.email}`);
   
  } else {
    console.error('Passwords do not match!');
  }
}
}
