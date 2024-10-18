import { DestroyRef, inject, Injectable, OnInit, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getCookie, setCookie } from '../utils/cookie.util';
import { Course } from './course.model';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';
import { AddCourse } from '../add-course/add-course.model';

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

  getAllCourses() {
    return this.httpClient
      .get<Course[]>("http://localhost:8080/course/get");
  }


  getAllCategories() {
    return this.httpClient
      .get<string[]>("http://localhost:8080/category/all");
  }

  getFilterCourses(filterData:{categoriesList:string[], levelList:string[]}){
    return this.httpClient.post<Course[]>("http://localhost:8080/course/filter", filterData);

  addCourse(courseData:FormData){
    return this.httpClient.post("http://localhost:8080/course/create",courseData,{
      headers:this.headers,
      withCredentials:true
    });

  }
  
}
