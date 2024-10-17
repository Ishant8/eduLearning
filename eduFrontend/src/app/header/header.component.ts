import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../profile-page/profile.service';
import { deleteCookie, getCookie } from '../utils/cookie.util';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private profileService = inject(ProfileService);

  userDetail = computed(()=>this.profileService.profile())
  isLoggedIn = signal<boolean>(false);

  ngOnInit(): void {
    if(getCookie('JwtToken')){
      this.profileService.getUser().subscribe({
        next:(resData) => {
          this.profileService.profile.set(resData)
        }
      });
      this.isLoggedIn.set(true);
    }
  }

  logout(){
    this.isLoggedIn.set(true);
    deleteCookie("JwtToken");
    window.location.reload();
  }
}
