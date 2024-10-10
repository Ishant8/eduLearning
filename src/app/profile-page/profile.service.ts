import { DestroyRef, inject, Injectable, OnInit, signal } from '@angular/core';
import { Profile } from './profile.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getCookie, setCookie } from '../utils/cookie.util';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profile = signal<Profile | undefined>(undefined);
  profileString = signal('empty');

  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  getUser() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${getCookie('JwtToken')}`,
      'X-Requested-With': 'XMLHttpRequest'
    });

    return this.httpClient.get<Profile>('http://localhost:8080/user', {headers: headers, withCredentials:true});
  }

  setUser(updatedData: Profile) {
    // console.log(JSON.stringify(updatedData));

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${getCookie('JwtToken')}`,
      'X-Requested-With': 'XMLHttpRequest'
    });

    this.httpClient
      .put<Profile>('http://localhost:8080/user/update', updatedData, {headers: headers, withCredentials:true})
      .subscribe({
        next: (resData) => {
          this.profile.set(resData);
        },
      });
  }

  login(credens:{email:string, password:string}){
    this.httpClient.post("http://localhost:8080/user/login", credens, {responseType: 'text'}).subscribe({
      next:(resData)=>{
        console.log(resData);
        
        setCookie('JwtToken', resData);
      }
    })
  }
}
