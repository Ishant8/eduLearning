import { Component } from '@angular/core';
import { TestomonialsComponent } from "../home-page/testomonials/testomonials.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  imports: [TestomonialsComponent, RouterLink],
  templateUrl: './course-detail-page.component.html',
  styleUrl: './course-detail-page.component.css'
})
export class CourseDetailPageComponent {

}
