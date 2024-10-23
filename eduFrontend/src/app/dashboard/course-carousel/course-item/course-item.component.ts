import { Component, input } from '@angular/core';
import { Course } from '../../../courses/course.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[course-item]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css'
})
export class CourseItemComponent {
  instructor: string[] = []
  description: string=''
  ratingSum: number=0;
  avgRating: number=0;

  course = input.required<Course>();
  enrolled = input.required<boolean>();

  starRating = Array(5).fill(0).map((x,i)=>i+1);
  isHalf(rate:number) { 
    return  Math.ceil(this.avgRating)===rate;
  };

  // instructor = computed(()=> Object.values(this.course().instructorDetails)[0]);
  ngOnInit(): void {
    this.instructor = Object.values(this.course().instructorDetails);
    this.description = this.course().courseDescription.split("\n")[1];

    console.log(this.course().instructorDetails);
    
    
    if(this.course().reviews.length != 0)
    {
      this.course().reviews.forEach((review)=>{
        this.ratingSum+=review.rating;
      });
  
      this.avgRating= Math.round((this.ratingSum/this.course().reviews.length)*10)/10;
    }
    else this.avgRating=0;
      
    
  }
}
