import { Component, inject } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-account-security',
  standalone: true,
  imports: [],
  templateUrl: './account-security.component.html',
  styleUrl: './account-security.component.css'
})
export class AccountSecurityComponent {
  profileService = inject(ProfileService);
  profile = this.profileService.profile;
}
