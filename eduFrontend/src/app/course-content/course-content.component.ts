import { AfterViewInit, Component, computed, ElementRef, inject, NgZone, OnInit, output, signal, ViewChild } from '@angular/core';
import { AchievementsComponent } from "../home-page/achievements/achievements.component";
import { CourseService } from '../courses/course.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { AddSection, AddSubSection } from '../add-course/add-course.model';
import { ProfileService } from '../profile-page/profile.service';

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
  profileService = inject(ProfileService);

  private scrollSpy: any;
  sectionName:string = ''
  courseName:string = ''

  emitNextSection = output();
  
  section = signal<AddSection | undefined>(undefined)
  subSections = computed(() => {
    return this.section()?.subSections
  })

  currentSectionIndex = signal<number>(-1);
  sectionsLength = signal<number>(0);

  completedSectionsIds = signal<number[]>([]);
  currentSectionCompleted = signal<boolean>(false);


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

        this.currentSectionIndex.set(this.courseService.sections().indexOf(this.section() as AddSection));
        this.sectionsLength.set(this.courseService.sections().length);

        console.log(this.subSections());

        const isPresent = this.courseService.completedSections().find(c => c.sectionId === this.section()?.sectionId)
        console.log(isPresent);
        
        if(!isPresent){
          this.currentSectionCompleted.set(true);
        }else{
          this.currentSectionCompleted.set(false);
        }
        

      } else {
        this.fetchSections();
        // this.fetchCompletedSections();
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

  navigateToCourse(courseName:string | null | undefined) {
    if(courseName)
      this.router.navigate(['/course','section'],{queryParams:{courseName}});
  }

  nextSection(){
    // const index = this.courseService.sections().indexOf(this.section() as AddSection);
    // const nextCourseName = this.courseService.sections()[index+1].courseName;
    const nextSecName = this.courseService.sections()[this.currentSectionIndex()+1].sectionName;
    this.router.navigate(['/course','content'],{queryParams:{courseName:this.courseName,secName:nextSecName}});
    
  }



  fetchSections(){
    this.courseService.getSections(this.courseName)
    .subscribe({
      next:(resData:AddSection[])=>{
        
        this.section.set(resData.filter((sec) =>{
          return sec.sectionName == this.sectionName;
        })[0])
        
        this.currentSectionIndex.set(resData.indexOf(this.section() as AddSection));
        this.sectionsLength.set(resData.length);

        console.log(this.section());
        
        
      },
      complete:()=>{
        this.fetchCompletedSections();
      }
    })
  }

  fetchCompletedSections(){
    this.courseService.getAllCompletedSections().subscribe({
      next:(resData:AddSection[])=>{
        for(let completedSection of resData){
          this.completedSectionsIds().push(completedSection.sectionId);
        }
        console.log(this.completedSectionsIds().includes(this.section()?.sectionId as number));
        
        this.currentSectionCompleted.set(!this.completedSectionsIds().includes(this.section()?.sectionId as number))
      }
    })
  }


  markComplete() {
    this.courseService.completeSection({
                userId:this.profileService.profile()?.userId as number, 
                sectionId:this.section()?.sectionId as number
              }).subscribe({
                next:(resdata)=>{
                  if(resdata){
                    this.completedSectionsIds().push(this.section()?.sectionId as number);
                    this.courseService.completedSections().push(this.section() as AddSection);
                    this.currentSectionCompleted.set(false);
                  }
                },
              })
  }


}
