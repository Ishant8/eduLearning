  import { Component, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { JumbotronComponent } from "../home-page/jumbotron/jumbotron.component";
import { TestomonialsComponent } from "../home-page/testomonials/testomonials.component";
import { TestimonialComponent } from '../home-page/testomonials/testimonial/testimonial.component';
import { CourseCardComponent } from "../course-card/course-card.component";
import { PageNavComponent } from "../page-nav/page-nav.component";
import { CourseService } from './course.service';
import { Course } from './course.model';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, JumbotronComponent, TestomonialsComponent, TestimonialComponent, CourseCardComponent, PageNavComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  @ViewChild(PageNavComponent) pageNav!: PageNavComponent;

  courseService = inject(CourseService);
  courses = signal<Course[] | undefined>(undefined);
  category = signal<string[]>([])

  categoryFilter = signal<string[]>([]);
  levelFilter = signal<string>('');
  currentPage = 1;

  someFun(){
    this.pageNav.currentPage=1;
  }

  addCategory(event: Event){
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    const isChecked = checkbox.checked;

    console.log(value +' is '+isChecked);
    this.someFun();

    if(isChecked)
    {
      this.categoryFilter().push(value);
      this.callFilterCourses(this.currentPage);
      console.log(this.categoryFilter());
      
    }
    else{
      this.categoryFilter.set(this.categoryFilter().filter((category)=> category != value));
      this.callFilterCourses(this.currentPage);
      // console.log(this.categoryFilter());
    }
    
  }

  addLevel(event: Event){
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    this.someFun();
    this.levelFilter.set(value);
    this.callFilterCourses(this.currentPage);
    // console.log(this.levelFilter());

    
  }

  callFilterCourses(page:number){
    
    let categoryFilterVar:string[];
    let levelFilterVar:string[];
    
    if(this.categoryFilter().length == 0)
    {
      categoryFilterVar = this.category();
    }
    else{
      categoryFilterVar = this.categoryFilter();
    }

    if(!this.levelFilter())
      {
        levelFilterVar = [
          "Intermediate",
          "Advanced",
          "Beginner"
      ];
      }else{
        levelFilterVar = []
        levelFilterVar.push(this.levelFilter());
      }
    console.log({"categoriesList":categoryFilterVar, "levelList":levelFilterVar});
    console.log(this.currentPage);
    
    this.courseService.getFilterCourses({"categoriesList":categoryFilterVar, "levelList":levelFilterVar},page).subscribe({
      next:(resData)=>{
        this.courses.set(resData);
        console.log("line 92",resData);
        
        // this.courseService.pageSubject.next(Math.ceil(resData.length/2))
      }
    })

    this.courseService.getSizeOfCourses({"categoriesList":categoryFilterVar, "levelList":levelFilterVar}).subscribe({
      next:(resData1)=>{
        console.log("line 121",resData1);
        
        this.courseService.pageSubject.next(Math.ceil(resData1/6))
      }
    })
  }

  ngOnInit() {

    

    this.courseService.getAllCourses(this.currentPage)
    .subscribe({
      next:(resData)=>{
        this.courses.set(resData);
        this.courseService.course.set(resData)
        // this.courseService.pageSubject.next(Math.ceil(resData.length/2))
      }
    })

    // this.callFilterCourses(1);

    this.courseService.getAllCategories().subscribe({
      next:(resData)=>{
        this.category.set(resData);
        console.log(resData);
        const levelFilterVar = [
          "Intermediate",
          "Advanced",
          "Beginner"
      ];
      this.courseService.getSizeOfCourses({"categoriesList":resData, "levelList":levelFilterVar}).subscribe({
        next:(resData1)=>{
          console.log("line 121",resData1);
          
          this.courseService.pageSubject.next(Math.ceil(resData1/6))
        }
      })
      }
    })

    
  }
  
}



// this.courses()?.forEach((course)=>{
        //   console.log(course.courseId+' '+course.courseName+' '+course.categoryName);
        //   // course.instructorDetails.forEach((instructor)=>{
        //   //   console.log(instructor.id +" "+instructor.name);
        //   // })
        //   for(let id in course.instructorDetails)
        //   {
        //     console.log("    "+id +" "+course.instructorDetails[id]);
            
        //   }
          
        //   course.reviews.forEach((review)=>{
        //     console.log("           "+review.reviewId+" "+review.comment+" "+review.userName+" "+review.courseId+" "+review.userId + " " + review.rating);
            
        //   })
          
          
        // });
