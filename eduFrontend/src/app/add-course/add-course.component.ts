import { Component, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { PhotoComponent } from '../profile-page/photo/photo.component';
import { ControlContainer, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../courses/course.service';
import { ProfileService } from '../profile-page/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { Course } from '../courses/course.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [PhotoComponent, FormsModule, RouterLink, ToastComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent implements OnInit {
  
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  title="Add Course";

  courseDetails = new FormGroup({
    courseName: new FormControl('',[Validators.required]),
    categoryName: new FormControl('',[Validators.required]),
    level: new FormControl('',[Validators.required]),
    sections: new FormControl<number>(0,[Validators.required]),
    hours: new FormControl(0,[Validators.required]),
    price: new FormControl(0,[Validators.required]),
    description: new FormControl('',[Validators.required]),
    curriculum: new FormControl('',[Validators.required]),
    courseReview: new FormControl('',[Validators.required]),
    coverImage: new FormControl(''),
    
  })
  
  courseId = signal<number|null>(null);

  selectedImage: File | null = null;

  private courseService = inject(CourseService);
  private profileService = inject(ProfileService);
  private toastService = inject(ToastService);
  private activatedRoute = inject(ActivatedRoute);

  imgSrc = signal<string | ArrayBuffer>('https://placehold.co/600x400/fff/20694d?text=Click+here+to+upload');

    categories:string[]=[];


    ngOnInit(): void {
      this.courseService.getAllCategories().subscribe({
        next:(resData)=>{
          this.categories = resData;
        }
      })


      this.activatedRoute.params.subscribe({
        next:({courseId})=>{
          if(courseId){
            this.courseId.set(Number(courseId));
            this.fetchDetails();
            this.title = "Edit Course"
          }
          
        }
      })
    }

    fetchDetails(){
      if(!this.courseService.course())
        {
          
          console.log("courseService.course() is empty .....");
          
          
          this.courseService.getCourses("http://localhost:8080/course/get").subscribe({
            next:(resData)=>{
              console.log("Data fetched");
              this.courseService.course.set(resData)
              
              // this.course.set(resData.find((course)=>course.courseId === this.courseId));
              const course =resData.find((course)=>{                
                return course.courseId === this.courseId()
              });
              
              const descriptionArray = course?.courseDescription.split('-----');
              // this.description = this.course()!.courseDescription.split("\n");
              this.courseDetails.patchValue({
                courseName: course?.courseName,
                categoryName: course?.categoryName,
                level: course?.level,
                sections: course?.sections,
                hours: course?.hours,
                price: course?.price,
                description: descriptionArray ? descriptionArray[0] : null,
                curriculum: descriptionArray ? descriptionArray[2] : null,
                courseReview: descriptionArray ? descriptionArray[1] : null,
                
              });

              this.imgSrc.set('data:image/*;base64,'+course?.coverImage);

            }
          })
        }
        else{
          console.log("courses are already set \n",this.courseService.course());
          
          // this.course.set(this.courseService.course()?.find((course)=>course.courseId === this.courseId));
          // this.description = this.course()?.courseDescription.split("\n") as string[];
          const course =this.courseService.course()?.find((course)=>course.courseId === this.courseId()) as Course;
              const descriptionArray = course.courseDescription.split('-----');
              // this.description = this.course()!.courseDescription.split("\n");
              this.courseDetails.patchValue({
                courseName: course.courseName,
                categoryName: course.categoryName,
                level: course.level,
                sections: course.sections,
                hours: course.hours,
                price: course.price,
                description: descriptionArray[0],
                curriculum: descriptionArray[1],
                courseReview: descriptionArray[2]
              });

              this.imgSrc.set('data:image/*;base64,'+course?.coverImage);


        }
    }
  

  imgDetails(event: Event) {
    // console.log(event);
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.selectedImage = input.files[0];
      // console.log(this.selectedImage);

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imgSrc.set(reader.result as ArrayBuffer);
      };

      reader.readAsDataURL(file);
    }
  }

  handleSubmit() {
    const description =
      this.courseDetails.get('description')?.value +
      '-----' +
      this.courseDetails.get('courseReview')?.value +
      '-----' +
      this.courseDetails.get('curriculum')?.value;

      // console.log(this.selectedImage);
      

      const formData = new FormData();
      if(this.courseDetails.get('coverImage')){

        formData.append('imageData', this.selectedImage as File);
      }

      console.log(formData.get('imageData'));
      
    

    const instructorDetails:{[id:number]:string} = {};
    instructorDetails[this.profileService.profile()!.userId] = this.profileService.profile()!.firstName;

    const courseData = {
      courseId:0,
      courseName: this.courseDetails.get('courseName')?.value,
      categoryName: this.courseDetails.get('categoryName')?.value,
      level: this.courseDetails.get('level')?.value,
      sections: this.courseDetails.get('sections')?.value,
      hours: this.courseDetails.get('hours')?.value,
      price: this.courseDetails.get('price')?.value,
      courseDescription: description,
      instructorDetails,
      
    };

    // console.log(description);
    

    
    // console.log(courseData);
    console.log(this.courseDetails.valid);
    
    if(this.courseDetails.valid){
      
      if(!this.courseId()){
        formData.append('instructorData',JSON.stringify(courseData));
        this.courseService.addCourse(formData).subscribe({
          next:(resData)=>{
            console.log(resData);
            this.toastService.generateToast(this.toastComponent,true,"Created Course Successfully")
          },
          error:()=>{
            this.toastService.generateToast(this.toastComponent,false,"Course Creation Failed")
          }
        })
      }else{
        courseData.courseId = this.courseId() as number;
        formData.append('instructorData',JSON.stringify(courseData));

        this.courseService.updateCourse(formData).subscribe({
          next:(resData)=>{
            console.log(resData);
            this.toastService.generateToast(this.toastComponent,true,"Created Updated Successfully")
          },
          error:()=>{
            this.toastService.generateToast(this.toastComponent,false,"Course Updation Failed")
          }
        })
      }

    }else{
      this.toastService.generateToast(this.toastComponent,false,"Enter All the details")
    }
    
  }
}
