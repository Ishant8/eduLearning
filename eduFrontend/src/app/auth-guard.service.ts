import { CanActivate, Router } from "@angular/router";
import { ProfileService } from "./profile-page/profile.service";
import { Injectable } from "@angular/core";
import { getCookie } from "./utils/cookie.util";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private profileService:ProfileService, private router: Router) {}


  canActivate(): boolean {

    if (getCookie('JwtToken')) {
      // If the user is logged in, redirect them away from the login route
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

@Injectable({
    providedIn: 'root'
  })
  export class LoggedIn implements CanActivate {
  
    constructor(private profileService:ProfileService, private router: Router) {}
  
  
    canActivate(): boolean {
  
      if (!getCookie('JwtToken')) {
        // If the user is logged in, redirect them away from the login route
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }