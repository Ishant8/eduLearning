import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseService } from '../courses/course.service';
import { AddSection } from '../add-course/add-course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-path',
  standalone: true,
  imports: [],
  templateUrl: './course-path.component.html',
  styleUrl: './course-path.component.css'
})
export class CoursePathComponent implements OnInit {
  
  courseService = inject(CourseService);
  courseSections = signal<AddSection[]>([]);
  courseName:string='';

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    
    this.route.queryParamMap.subscribe(params => {
      this.courseName = params.get('courseName') as string; 
      this.fetchSections();
    });
    

  }

  fetchSections(){
    this.courseService.getSections(this.courseName)
    .subscribe({
      next:(resData:AddSection[])=>{
        this.courseSections.set(resData);
        console.log(this.courseSections());
        
      }
    })
  }

}
