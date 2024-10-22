import { AfterViewInit, Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { TestomonialsComponent } from "../home-page/testomonials/testomonials.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../courses/course.service';
import { Course } from '../courses/course.model';
import { ProfileService } from '../profile-page/profile.service';
import { FormsModule } from '@angular/forms';
import { Review } from '../home-page/testomonials/testimonial.model';
import { TestimonialService } from '../home-page/testomonials/testimonial.service';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  imports: [TestomonialsComponent, RouterLink, FormsModule, ToastComponent],
  templateUrl: './course-detail-page.component.html',
  styleUrl: './course-detail-page.component.css'
})
export class CourseDetailPageComponent implements OnInit, AfterViewInit {
  
  
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @ViewChild(TestomonialsComponent) set testimonialsComponent(component: TestomonialsComponent) {
    if (component) {
      this._testimonialsComponent = component;
      this.setupTestimonialsSubscription();
    }
  }
  private _testimonialsComponent: TestomonialsComponent | undefined;


  courseService = inject(CourseService)
  testimonialService = inject(TestimonialService);
  router = inject(Router)
  profileService = inject(ProfileService);
  toastService = inject(ToastService)
  course = signal<Course | undefined>(undefined)
  courseName = computed(() => this.course()!.courseName)
  instructor = computed(() => Object.values(this.course()!.instructorDetails)[0])
  avgRating = computed(() => {
    if (this.course()!.reviews.length != 0) {
      this.course()!.reviews.forEach((review) => {
        this.ratingSum += review.rating;
      });
      console.log(this.ratingSum);
      
      return Math.round((this.ratingSum / this.course()!.reviews.length) * 10) / 10;
    }
    return 0
  });
  description = computed(() => this.course()?.courseDescription.split("-----") as string[])

  starRating = Array(5).fill(0).map((x,i)=>i+1);
  isHalf(rate:number) { 
    return  Math.ceil(this.avgRating())===rate;
  };

  courseId:number | undefined
  fullName=''
  email=''
  comment=''
  rating:number=7;
  ratingSum: number=0;
  isReviewed = false;  

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {

    if (this._testimonialsComponent) {
      this.setupTestimonialsSubscription();
    }
  }

  ngOnInit(){

    console.log("inside course-detail-init");
    
    // this.fetchDetails();

    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('courseId')); 
      this.fetchDetails();
    });

    console.log(this.courseId);

    
  }

  fetchDetails(){
    if(!this.courseService.course())
      {
        
        console.log("courseService.course() is empty .....");
        
        
        this.courseService.getCourses("http://localhost:8080/course/get").subscribe({
          next:(resData)=>{
            console.log("Data fetched");
            
            this.course.set(resData.find((course)=>course.courseId === this.courseId));
            this.courseService.course.set(resData)
            // this.description = this.course()!.courseDescription.split("\n");
          }
        })
      }
      else{
        console.log("courses are already set \n",this.courseService.course());
        
        this.course.set(this.courseService.course()?.find((course)=>course.courseId === this.courseId));
        // this.description = this.course()?.courseDescription.split("\n") as string[];
      }
  }

  enrol(theCourseName:string | undefined){
    this.courseService.enrolCourse(theCourseName).subscribe({
      next:(resData)=>{
        console.log(resData);
      },
      complete:()=>{
        this.router.navigate(['/dashboard']).then(()=>{
          window.location.reload();
        });
      }
    })
    
  }

  addReview(){
    console.log(
      this.fullName + ' ' + this.comment + ' ' + this.email + ' ' + this.rating
    );

    console.log(this.testimonialService.reviews());
    console.log(this.testimonialService
      .reviews()
      ?.map((aReview) => {
        return aReview.userName;
      })
      .find((ele) => ele === this.fullName));
    
    

    if (this.isReviewed)
    {
      this.courseService
        .sendReview({
          userName: this.fullName,
          courseName: this.course()!.courseName,
          comment: this.comment,
          rating: this.rating,
        },"http://localhost:8080/review/updateReview")
        .subscribe({
          next: (resData) => {
            // console.log(resData);
            this.toastService.generateToast(this.toastComponent,true,"Review Updated Successfully")
          },
          complete: () => {
            setTimeout(()=>{
              window.location.reload();
            },700)
          },
          error:()=>{
            this.toastService.generateToast(this.toastComponent,false,"Review Updation Failed!")
          }
        });
    }else{
      this.courseService
        .sendReview({
          userName: this.fullName,
          courseName: this.course()!.courseName,
          comment: this.comment,
          rating: this.rating,
        }, "http://localhost:8080/review/addReview")
        .subscribe({
          next: (resData) => {
            // console.log(resData);
            this.toastService.generateToast(this.toastComponent,true,"Review Added Successfully")
          },
          complete: () => {
            setTimeout(()=>{
              window.location.reload();
            },700)
          },
          error:()=>{
            this.toastService.generateToast(this.toastComponent,false,"Review Addition Failed!")
          }
        });
      
    }
  }

  checkReview(){

    this.testimonialService.reviews()?.forEach((review)=>{
      if(review.userId === this.profileService.profile()?.userId)
      {
        this.isReviewed = true;
      }
    })
  }

  private setupTestimonialsSubscription() {
    if (this._testimonialsComponent) {
      this._testimonialsComponent.reviews$.subscribe({
        next: (value) => {
          if (value && value.length > 0) {
            console.log("Reviews received:", value);
            this.checkReview();
          }
        },
        error: (error) => console.error('Error in reviews subscription:', error)
      });
    }
  }  
  
}
