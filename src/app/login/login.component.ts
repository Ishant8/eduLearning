import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../profile-page/profile.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  profileService = inject(ProfileService)
  
  username = ''
  password = ''

  doLogin(){
    this.profileService.login({email:this.username, password:this.password});
  }
}
