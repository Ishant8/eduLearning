import { DestroyRef, inject, Injectable, OnInit, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getCookie, setCookie } from '../utils/cookie.util';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  course = signal<Course[] | undefined>(undefined);

  httpClient = inject(HttpClient);
  destroyRef = inject(DestroyRef);

  headers = new HttpHeaders({
    Authorization: `Bearer ${getCookie('JwtToken')}`,
    'X-Requested-With': 'XMLHttpRequest',
  });

  getCourses(url:string) {
    return this.httpClient
      .get<Course[]>(url,{
        headers: this.headers
      });
  }
}
