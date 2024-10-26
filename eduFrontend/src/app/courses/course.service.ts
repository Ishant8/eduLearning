import { DestroyRef, inject, Injectable, OnInit, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getCookie, setCookie } from '../utils/cookie.util';
import { Course } from './course.model';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';
import { AddCourse, AddSection } from '../add-course/add-course.model';
import { WriteReview } from '../course-detail-page/review.model';
import { Review } from '../home-page/testomonials/testimonial.model';
import { BehaviorSubject, debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  course = signal<Course[] | undefined>(undefined);
  sections = signal<AddSection[]>([]);
  public pageSubject = new BehaviorSubject<number>(1);
  public pages$ = this.pageSubject.asObservable();
  pages=signal<number>(0);

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

  getAllCourses(page:number) {
    return this.httpClient
      .get<Course[]>("http://localhost:8080/course/get?page="+--page+"&size="+6);
  }


  getAllCategories() {
    return this.httpClient
      .get<string[]>("http://localhost:8080/category/all");
  }

  getSizeOfCourses(filterData:{categoriesList:string[], levelList:string[]}){
    return this.httpClient.post<number>("http://localhost:8080/course/size", filterData,{
      withCredentials:true
    });

  }

  getFilterCourses(filterData:{categoriesList:string[], levelList:string[]},page:number){
    return this.httpClient.post<Course[]>("http://localhost:8080/course/filter?page="+--page+"&size="+6, filterData);
  }

  addCourse(courseData:FormData){
    return this.httpClient.post("http://localhost:8080/course/create",courseData,{
      headers:this.headers,
      withCredentials:true
    });

  }
  
  updateCourse(courseData:FormData){
    return this.httpClient.put("http://localhost:8080/course/update",courseData,{
      headers:this.headers,
      withCredentials:true
    });

  }


  enrolCourse(courseName:string|undefined){
    return this.httpClient.post("http://localhost:8080/user/enrol",courseName,{
      headers:this.headers,
      withCredentials:true
    });
  }

  getCoursesBySearch(searchItem:string){
    return this.httpClient.get<Course[]>("http://localhost:8080/course/search?search="+searchItem,{
      headers:this.headers,
      withCredentials:true
    })

  }

  sendReview(review: WriteReview, url:string){
    return this.httpClient.post(url,review,{
      responseType:'text',
      headers:this.headers,
      withCredentials:true
    })
  }

  getInstructorCourses(instructorEmail:string){
    return this.httpClient.get<Course[]>("http://localhost:8080/course/instructor?instructor="+instructorEmail,{
      headers:this.headers,
      withCredentials:true
    })
  }


  getSections(courseName:string){
    return this.httpClient.get<AddSection[]>("http://localhost:8080/section/get/course?courseName="+courseName,{
      headers:this.headers,
      withCredentials:true
    }).pipe(tap((resData)=>{
      this.sections.set(resData);
    }))
  }

  getLevels(){
    return this.httpClient.get<[]>("http://localhost:8080/course/levels",{
      headers:this.headers,
      withCredentials:true
    })

  }
  
}
