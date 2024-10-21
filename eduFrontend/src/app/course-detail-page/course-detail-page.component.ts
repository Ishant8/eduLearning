import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TestomonialsComponent } from "../home-page/testomonials/testomonials.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../courses/course.service';
import { Course } from '../courses/course.model';
import { ProfileService } from '../profile-page/profile.service';
import { FormsModule } from '@angular/forms';
import { Review } from '../home-page/testomonials/testimonial.model';
import { TestimonialService } from '../home-page/testomonials/testimonial.service';

@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  imports: [TestomonialsComponent, RouterLink, FormsModule],
  templateUrl: './course-detail-page.component.html',
  styleUrl: './course-detail-page.component.css'
})
export class CourseDetailPageComponent implements OnInit {
  
  courseId:number | undefined
  courseService = inject(CourseService)
  testimonialService = inject(TestimonialService);
  router = inject(Router)
  course = signal<Course | undefined>(undefined)

  courseName = (() => this.course()!.courseName)

  fullName=''
  email=''
  comment=''
  rating:number=7;

  // isReviewed = computed(() => this.testimonialService
  // .reviews()
  // ?.map((aReview) => {
  //   return aReview.userName;
  // })
  // .find((ele) => ele === this.fullName))

  

  profileService = inject(ProfileService);

  instructor = computed(() => Object.values(this.course()!.instructorDetails)[0])
  ratingSum: number=0;
  avgRating = computed(() => {
    if (this.course()!.reviews.length != 0) {
      this.course()!.reviews.forEach((review) => {
        this.ratingSum += review.rating;
      });

      return Math.round((this.ratingSum / this.course()!.reviews.length) * 10) / 10;
    }
    return 0
  });

  description = computed(() => this.course()?.courseDescription.split("-----") as string[])
  // description:string[] = [] ;


  constructor(private route: ActivatedRoute) {}

  ngOnInit(){

    console.log("inside course-detail-init");
    
    this.fetchDetails();

    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('courseId')); 
      this.fetchDetails();
    });

    console.log(this.courseId);
        
    
    
    
    

    // this.instructor.set(Object.values(this.course()!.instructorDetails)[0]);
    
    // if (this.course()!.reviews.length != 0) {
    //   this.course()!.reviews.forEach((review) => {
    //     this.ratingSum += review.rating;
    //   });

    //   this.avgRating =
    //     Math.round((this.ratingSum / this.course()!.reviews.length) * 10) / 10;
    // } else this.avgRating = 0;

    // this.description.set(this.course()?.courseDescription.split("\n") as string[])
    // console.log(this.description);
    
    
    
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
    
    

    if (
      this.testimonialService
      .reviews()
      ?.map((aReview) => {
        return aReview.userName;
      })
      .find((ele) => ele === this.fullName))
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
          },
          complete: () => {
            window.location.reload();
          },
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
          },
          complete: () => {
            window.location.reload();
          },
        });
      
    }
  }

  
  
}
