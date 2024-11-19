import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { PhotoComponent } from '../profile-page/photo/photo.component';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseService } from '../courses/course.service';
import { ProfileService } from '../profile-page/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { Course } from '../courses/course.model';
import { CommonModule } from '@angular/common';
import { AddSection, AddSubSection } from './add-course.model';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage, OutputFormat } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ToastComponent,
    ReactiveFormsModule,
    CommonModule,
    ImageCropperComponent
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent implements OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  nameOfCourseToFetchSections:string = '';
  
  title = 'Add';

  formStep = 0;
  sectionArray: AddSection[] = [];
  subSectionArray: AddSubSection[] = [];

  editIndex: number = -1;
  editSectionIndex: number = -1;

  sectionTotal:number = 0;
  subSectionTotal:number = 0;

  deletedSections:string = '';
  deletedSubSections:string = '';

  courseDetails = new FormGroup({
    courseName: new FormControl('', [Validators.required]),
    categoryName: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
    sections: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
    hours: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    price: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required]),
    curriculum: new FormControl('', [Validators.required]),
    courseReview: new FormControl('', [Validators.required]),
    coverImage: new FormControl(''),
    sectionName: new FormControl(''),
    sectionDescription: new FormControl(''),
    subSectionTitle: new FormControl(''),
    subSectionContent: new FormControl(''),
  });

  courseId = signal<number | null>(null);

  selectedImage: File | null = null;

  private courseService = inject(CourseService);
  private profileService = inject(ProfileService);
  private toastService = inject(ToastService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  imgSrc = signal<string | ArrayBuffer>(
    'https://placehold.co/1100x500/ddd/555?text=Sample+Image'
  );

  imgSrc2 = signal<string | undefined>(undefined);


  categories: string[] = [];
  levels: string[] = [];

  subSectionState = 'Add';
  sectionState = 'Add';

  croppedImage: SafeUrl = '';
  imageChangedEvent: Event | null = null;

  imageSelected:boolean = false;

  isLoading = signal<boolean>(true);

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.courseService.getAllCategories().subscribe({
      next: (resData) => {
        this.categories = resData;
      },
    });

    this.courseService.getLevels().subscribe({
      next: (resData) => {
        this.levels = resData;
      },
    });

    this.activatedRoute.params.subscribe({
      next: ({ courseId }) => {
        if (courseId) {
          this.courseId.set(Number(courseId));
          this.fetchDetails();
          this.title = 'Edit';
        }
      },
    });
  }

  nextStep() {
    this.formStep++;
    if (this.title === 'Edit') {
      this.fetchSections();
    }
    window.scroll(0, 0);
  }

  prevStep() {
    this.formStep--;
    window.scroll(0, 0);
  }

  addSection() {
    this.sectionArray.push({
      sectionId: 0,
      sectionName: this.courseDetails.get('sectionName')?.value as string,
      sectionDescription: this.courseDetails.get('sectionDescription')
        ?.value as string,
      subSections: this.subSectionArray,
      courseName: null,
    });

    this.courseDetails.get('sectionName')?.setValue('');
    this.courseDetails.get('sectionDescription')?.setValue('');
    this.subSectionArray = [];
  }

  addSubSection() {
    this.subSectionArray.push({
      id: 0,
      subSectionName: this.courseDetails.get('subSectionTitle')
        ?.value as string,
      content: this.courseDetails.get('subSectionContent')?.value as string,
      sectionName: null,
    });

    this.courseDetails.get('subSectionTitle')?.setValue('');
    this.courseDetails.get('subSectionContent')?.setValue('');
  }

  isSubSectionValid(): boolean {
    return (
      this.courseDetails.get('subSectionTitle')?.value === '' ||
      this.courseDetails.get('subSectionContent')?.value === ''
    );
  }

  isSectionValid(): boolean {
    return (
      this.courseDetails.get('sectionName')?.value === '' ||
      this.courseDetails.get('sectionDescription')?.value === '' ||
      this.subSectionArray.length === 0
    );
  }

  isStepValid(step: number) {
    if (step === 0) {
      return (
        this.courseDetails.get('courseName')?.valid &&
        this.courseDetails.get('categoryName')?.valid &&
        this.courseDetails.get('level')?.valid &&
        this.courseDetails.get('sections')?.valid &&
        this.courseDetails.get('hours')?.valid &&
        this.courseDetails.get('price')?.valid &&
        this.courseDetails.get('description')?.valid &&
        this.courseDetails.get('curriculum')?.valid &&
        this.courseDetails.get('courseReview')?.valid &&
        this.imgSrc() !==
          'https://placehold.co/600x400/fff/20694d?text=Click+here+to+upload'
      );
    }
    return true;
  }

  populateSection(index: number) {
    this.courseDetails
      .get('sectionName')
      ?.setValue(this.sectionArray[index].sectionName);
    this.courseDetails
      .get('sectionDescription')
      ?.setValue(this.sectionArray[index].sectionDescription);
    this.subSectionArray = this.sectionArray[index].subSections;
    this.subSectionTotal = this.subSectionArray.length;
    this.sectionState = 'Edit';
    this.editSectionIndex = index;
  }

  populateSubSection(index: number) {
    this.courseDetails
      .get('subSectionTitle')
      ?.setValue(this.subSectionArray[index].subSectionName);
    this.courseDetails
      .get('subSectionContent')
      ?.setValue(this.subSectionArray[index].content);
    this.subSectionState = 'Edit';
    this.editIndex = index;
  }

  editSection() {
    this.sectionArray[this.editSectionIndex] = {
      sectionId: this.sectionArray[this.editSectionIndex].sectionId,
      sectionName: this.courseDetails.get('sectionName')?.value as string,
      sectionDescription: this.courseDetails.get('sectionDescription')
        ?.value as string,
      subSections: this.subSectionArray,
      courseName: this.sectionArray[this.editSectionIndex].courseName,
    };

    this.courseDetails.get('sectionName')?.setValue('');
    this.courseDetails.get('sectionDescription')?.setValue('');
    this.subSectionArray = [];
    this.editSectionIndex = -1;
    this.sectionState = 'Add';
  }

  editSubSection() {
    this.subSectionArray[this.editIndex] = {
      id: this.subSectionArray[this.editIndex].id,
      subSectionName: this.courseDetails.get('subSectionTitle')
        ?.value as string,
      content: this.courseDetails.get('subSectionContent')?.value as string,
      sectionName: this.subSectionArray[this.editIndex].sectionName,
    };

    this.courseDetails.get('subSectionTitle')?.setValue('');
    this.courseDetails.get('subSectionContent')?.setValue('');
    this.editIndex = -1;
    this.subSectionState = 'Add';
  }

  deleteSubSection(index: number) {
    
    this.deletedSubSections += this.subSectionArray[index].id + ' ';
    console.log(this.deletedSubSections + 'length: '+ this.deletedSubSections.length);
    
    this.subSectionArray = this.subSectionArray.filter((x, i) => i !== index);
  }

  deleteSection(index: number) {
    this.deletedSections += this.sectionArray[index].sectionId + ' ';
    console.log(this.deletedSections + 'length: '+ this.deletedSections.length);

    this.sectionArray = this.sectionArray.filter((x, i) => i !== index);
  }

  fetchDetails() {
    if (!this.courseService.course()) {
      console.log('courseService.course() is empty .....');

      this.courseService
        .getCourses('http://localhost:8080/course/get')
        .subscribe({
          next: (resData) => {
            console.log('Data fetched');
            this.courseService.course.set(resData);

            // this.course.set(resData.find((course)=>course.courseId === this.courseId));
            const course = resData.find((course) => {
              return (
                course.courseId === this.courseId() &&
                course.instructorEmail === this.profileService.profile()?.email
              );
            });

            if (course) {
              const descriptionArray = course?.courseDescription.split('-----');
              // this.description = this.course()!.courseDescription.split("\n");
              
              this.nameOfCourseToFetchSections = course.courseName;
              
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

              this.imgSrc.set('data:image/*;base64,' + course?.coverImage);
              this.imgSrc2.set('data:image/*;base64,' + course?.coverImage);

              this.isLoading.set(false);
            } else {
              this.toastService.generateToast(
                this.toastComponent,
                false,
                'Course Not Found'
              );
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 1000);
            }
          },
        });
    } else {
      console.log('courses are already set \n', this.courseService.course());

      // this.course.set(this.courseService.course()?.find((course)=>course.courseId === this.courseId));
      // this.description = this.course()?.courseDescription.split("\n") as string[];
      const course = this.courseService
        .course()
        ?.find(
          (course) =>
            course.courseId === this.courseId() &&
            course.instructorEmail === this.profileService.profile()?.email
        ) as Course;
      if (course) {
        const descriptionArray = course.courseDescription.split('-----');
        // this.description = this.course()!.courseDescription.split("\n");

        this.nameOfCourseToFetchSections = course.courseName;

        this.courseDetails.patchValue({
          courseName: course.courseName,
          categoryName: course.categoryName,
          level: course.level,
          sections: course.sections,
          hours: course.hours,
          price: course.price,
          description: descriptionArray[0],
          curriculum: descriptionArray[1],
          courseReview: descriptionArray[2],
        });

        this.imgSrc.set('data:image/*;base64,' + course?.coverImage);
        this.imgSrc2.set('data:image/*;base64,' + course?.coverImage);

        this.isLoading.set(false);
      } else {
        this.courseService.course.set(undefined);
        this.fetchDetails();
      }
    }
  }

  fetchSections() {
    this.courseService.getSections(this.nameOfCourseToFetchSections).subscribe({
      next: (resData) => {
        this.sectionArray = resData;
        this.sectionTotal = this.sectionArray.length;
        console.log('line 298', this.sectionArray);
      },
    });
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
        this.imgSrc2.set(reader.result as string);

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
    if (this.courseDetails.get('coverImage')) {
      formData.append('imageData', this.selectedImage as File);
    }

    console.log(formData.get('imageData'));

    const instructorDetails: { [id: number]: string } = {};
    instructorDetails[this.profileService.profile()!.userId] =
      this.profileService.profile()!.firstName;

    const courseData = {
      courseId: 0,
      courseName: this.courseDetails.get('courseName')?.value,
      categoryName: this.courseDetails.get('categoryName')?.value,
      level: this.courseDetails.get('level')?.value,
      sections: this.courseDetails.get('sections')?.value,
      hours: this.courseDetails.get('hours')?.value,
      price: this.courseDetails.get('price')?.value,
      courseDescription: description,
      instructorDetails,
    };

    const sectionData = {
      sections: this.sectionArray,
    };

    // console.log(description);

    // console.log(courseData);
    console.log(this.courseDetails.valid);
    console.log('line 363', this.sectionArray);

    if (this.courseDetails.valid) {
      formData.append('sections', JSON.stringify(sectionData));
      console.log(formData.get('sections'));

      if (!this.courseId()) {
        formData.append('instructorData', JSON.stringify(courseData));

        this.courseService.addCourse(formData).subscribe({
          next: (resData) => {
            console.log(resData);
            this.toastService.generateToast(
              this.toastComponent,
              true,
              'Created Course Successfully'
            );
            setTimeout(()=>{

              this.router.navigate(["/dashboard"]);
            },1000);
          },
          error: () => {
            this.toastService.generateToast(
              this.toastComponent,
              false,
              'Course Creation Failed'
            );
            setTimeout(()=>{

              this.router.navigate(["/dashboard"]);
            },1000);

          },
        });
      } else {
        courseData.courseId = this.courseId() as number;
        formData.append('instructorData', JSON.stringify(courseData));
        formData.append('deletedSections', this.deletedSections)
        formData.append('deletedSubSections', this.deletedSubSections)

        this.courseService.updateCourse(formData).subscribe({
          next: (resData) => {
            console.log(resData);
            this.courseService.course.set(undefined);
            this.toastService.generateToast(
              this.toastComponent,
              true,
              'Course Updated Successfully'
            );
            setTimeout(()=>{

              this.router.navigate(["/dashboard"]);
            },1000);

          },
          error: (err) => {
            
            console.log(err.error.message);
            
            
            this.toastService.generateToast(
              this.toastComponent,
              false,
              'Course Updation Failed'
            );
            setTimeout(()=>{

              this.router.navigate(["/dashboard"]);
            },1000);

          },
        });
      }
    
    } else {
      this.toastService.generateToast(
        this.toastComponent,
        false,
        'Enter All the details'
      );
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl as string
    );
    const blob = event.blob as Blob;

    const croppedImageFile = new File(
      [blob],
      this.selectedImage?.name
        ? (this.selectedImage?.name as string)
        : 'newFile'+new Date().getTime()+'.jpg',
      { type: blob.type }
    );
    
    this.selectedImage = croppedImageFile;
    console.log(this.selectedImage);
    
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
