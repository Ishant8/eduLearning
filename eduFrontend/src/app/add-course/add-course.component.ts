import { Component, inject, viewChild } from '@angular/core';
import { PhotoComponent } from '../profile-page/photo/photo.component';
import { ControlContainer, FormsModule, NgModel } from '@angular/forms';
import { CourseService } from '../courses/course.service';
import { ProfileService } from '../profile-page/profile.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [PhotoComponent, FormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent {
  courseName = viewChild<NgModel>('courseName');
  categoryName = viewChild<NgModel>('categoryName');
  level = viewChild<NgModel>('level');
  sections = viewChild<NgModel>('sections');
  hours = viewChild<NgModel>('hours');
  price = viewChild<NgModel>('price');
  description = viewChild<NgModel>('description');
  curriculum = viewChild<NgModel>('curriculum');
  courseReview = viewChild<NgModel>('courseReview');

  selectedImage: File | null = null;

  private courseService = inject(CourseService);
  private profileService = inject(ProfileService);

  imgSrc: string | ArrayBuffer =
    'https://placehold.co/600x400/fff/20694d?text=Click+here+to+upload';

  imgDetails(event: Event) {
    // console.log(event);
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.selectedImage = input.files[0];
      // console.log(this.selectedImage);

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imgSrc = reader.result as ArrayBuffer;
      };

      reader.readAsDataURL(file);
    }
  }

  handleSubmit() {
    const description =
      this.description()?.control.value +
      '-----' +
      this.courseReview()?.control.value +
      '-----' +
      this.curriculum()?.control.value;

    const formData = new FormData();
    formData.append('imageData', this.selectedImage as File);
    

    const instructorDetails:{[id:number]:string} = {};
    instructorDetails[this.profileService.profile()!.userId] = this.profileService.profile()!.firstName;

    const courseData = {
      courseName: this.courseName()?.control.value,
      categoryName: this.categoryName()?.control.value,
      level: this.level()?.control.value,
      sections: this.sections()?.control.value,
      hours: this.hours()?.control.value,
      price: this.price()?.control.value,
      courseDescription: description,
      instructorDetails
    };

    console.log(description);
    

    formData.append('instructorData',JSON.stringify(courseData));
    
    this.courseService.addCourse(formData).subscribe({
      next:(resData)=>{
        console.log(resData);
        
      }
    })
  }
}
