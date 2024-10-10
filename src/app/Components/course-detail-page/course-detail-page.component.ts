import { Component } from '@angular/core';
import { TestimonialsComponent } from "../home-page/testimonials/testimonials.component";

@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  imports: [TestimonialsComponent],
  templateUrl: './course-detail-page.component.html',
  styleUrl: './course-detail-page.component.css'
})
export class CourseDetailPageComponent {

}
