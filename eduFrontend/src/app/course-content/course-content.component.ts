import { AfterViewInit, Component, computed, ElementRef, inject, NgZone, OnInit, signal, ViewChild } from '@angular/core';
import { AchievementsComponent } from "../home-page/achievements/achievements.component";
import { CourseService } from '../courses/course.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { AddSection, AddSubSection } from '../add-course/add-course.model';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [AchievementsComponent, RouterLink],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent implements OnInit, AfterViewInit {
  
  @ViewChild('scrollSpyContainer') scrollContainer: ElementRef | undefined;
  
  courseService = inject(CourseService);

  private scrollSpy: any;
  sectionName:string = ''
  courseName:string = ''
  
  section = signal<AddSection | undefined>(undefined)
  subSections = computed(() => {
    return this.section()?.subSections
  })

  constructor(private route: ActivatedRoute, private router: Router,
    private elementRef: ElementRef) {}

    scrollToSection(event: Event, sectionId: string) {
      event.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  
    ngOnInit() {    
    
    this.route.queryParamMap.subscribe((params) => {
      this.sectionName = params.get('secName') as string;
      this.courseName = params.get('courseName') as string;

      console.log(this.sectionName + ' ' + this.courseName);

      if (this.courseService.sections().length != 0) {
        
        this.section.set(
          this.courseService.sections().filter((sec) => {
            return sec.sectionName == this.sectionName;
          })[0]
        );

        console.log(this.subSections());
        

      } else {
        this.fetchSections();
      }
    });
    

  }

  ngAfterViewInit(){

    const scrollSpyElement = document.querySelector('[data-bs-spy="scroll"]');
    if (scrollSpyElement) {
      const event = new Event('load');
      window.dispatchEvent(event);
    }
  }

  fetchSections(){
    this.courseService.getSections(this.courseName)
    .subscribe({
      next:(resData:AddSection[])=>{
        
        this.section.set(resData.filter((sec) =>{
          return sec.sectionName == this.sectionName;
        })[0])
        
        console.log(this.section());
        
        
      }
    })
  }



}
