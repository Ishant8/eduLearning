import { Component } from '@angular/core';
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CoursesComponent } from "./courses/courses.component";
import { CourseCardComponent } from "./course-card/course-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomePageComponent, LoginComponent, RegisterComponent, CoursesComponent, CourseCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
