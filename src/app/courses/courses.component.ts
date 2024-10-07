  import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { JumbotronComponent } from "../home-page/jumbotron/jumbotron.component";
import { TestomonialsComponent } from "../home-page/testomonials/testomonials.component";
import { TestimonialComponent } from '../home-page/testomonials/testimonial/testimonial.component';
import { CourseCardComponent } from "../course-card/course-card.component";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, JumbotronComponent, TestomonialsComponent, TestimonialComponent, CourseCardComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

}
