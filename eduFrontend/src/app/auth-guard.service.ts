import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { ProfileService } from "./profile-page/profile.service";
import { Injectable } from "@angular/core";
import { deleteCookie, getCookie } from "./utils/cookie.util";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private profileService:ProfileService, private router: Router) {}


  canActivate(): Observable<boolean> {

    if (getCookie('JwtToken')) {
      // If the user is logged in, redirect them away from the login route
      this.router.navigate(['/']);
      return of(false);
    }
    return of(true);
  }
}

@Injectable({
    providedIn: 'root'
  })
  export class LoggedIn implements CanActivate {
  
    constructor(private profileService:ProfileService, private router: Router, private authService:AuthService) {}
  
  
    canActivate():Observable<boolean> {
  
      if (!getCookie('JwtToken')) {
        // If the user is logged in, redirect them away from the login route
        this.router.navigate(['/login']);
        return of(false);
      }
      return this.authService.validateToken(getCookie('JwtToken') as string).pipe(
        map(isValid=>{
          if (!isValid) {
            // Token is invalid, redirect to login
            this.authService.logout(); // Clear invalid token
            return false;
          }

          return true;
        })
      );
    }
  }

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private readonly API_URL = 'http://localhost:8080';
  
    constructor(private http: HttpClient,private router: Router) {}
  
    validateToken(token: string): Observable<boolean> {
      return this.http.post<{valid: boolean}>(`${this.API_URL}/auth/validate`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).pipe(
        map(response => response.valid),
        catchError(() => of(false))
      );
    }

    logout() {
      
      deleteCookie('JwtToken');
      window.location.reload();
    }
  }

