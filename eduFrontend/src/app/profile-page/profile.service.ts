import { DestroyRef, inject, Injectable, OnInit, signal } from '@angular/core';
import { Profile } from './profile.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getCookie, setCookie } from '../utils/cookie.util';
import { Register } from '../register/register.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profile = signal<Profile | undefined>(undefined);
  profileString = signal('empty');

  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  headers = new HttpHeaders({
    Authorization: `Bearer ${getCookie('JwtToken')}`,
    'X-Requested-With': 'XMLHttpRequest',
  });
  
  deleteProfile(){
    return this.httpClient.delete('http://localhost:8080/user/delete/'+this.profile()?.userId,{
      headers: this.headers,
      withCredentials: true,
      responseType:'text'
    })
  }
  
  checkPassword(password:string){
    
    return this.httpClient
    .post<boolean>('http://localhost:8080/user/check', {oldPassword: password},{
      headers: this.headers,
      withCredentials: true,
      // responseType:'text'
    });
  }
  
  addUser(url:string,userDetails:Register){
    return this.httpClient.post(url,userDetails);
  }
  
  changePassword(oldPassword: string, newPassword: string) {
    
    return this.httpClient
      .put<{message:string, status:number, timestamp:string}>('http://localhost:8080/user/update/password', {oldPassword, newPassword},{
        headers: this.headers,
        withCredentials: true,
        // responseType:'text'
      });
  }

  getUser() {

    return this.httpClient.get<Profile>('http://localhost:8080/user', {
      headers: this.headers,
      withCredentials: true,
    });
  }

  setUser(updatedData: Profile) {
    // console.log(JSON.stringify(updatedData));

    return this.httpClient
      .put<Profile>('http://localhost:8080/user/profile/update', updatedData, {
        headers: this.headers,
        withCredentials: true,
      });
      
  }

  uploadProfileImage(url:string,imgData:FormData){

    return this.httpClient.post(url,imgData,{
      responseType:'text',
      headers: this.headers,
      withCredentials:true
    })

  }

  login(credens: { email: string; password: string }) {
    return this.httpClient
      .post('http://localhost:8080/user/login', credens, {
        responseType: 'text',
        withCredentials: true
      });
  }
}
