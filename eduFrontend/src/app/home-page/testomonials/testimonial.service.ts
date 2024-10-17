import { DestroyRef, inject, Injectable, OnInit, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getCookie, setCookie } from '../../utils/cookie.util';
import { Review } from './testimonial.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  reviews = signal<Review[] | undefined>(undefined);

  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  
  headers = new HttpHeaders({
    Authorization: `Bearer ${getCookie('JwtToken')}`,
    'X-Requested-With': 'XMLHttpRequest',
  });
  

  getReview(url:string) {
    return this.httpClient.get<Review[]>(url);
  }

}
