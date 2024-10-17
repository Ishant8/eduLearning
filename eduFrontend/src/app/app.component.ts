import { Component } from '@angular/core';
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CoursesComponent } from "./courses/courses.component";
import { CourseCardComponent } from "./course-card/course-card.component";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomePageComponent, LoginComponent, RegisterComponent, CoursesComponent, CourseCardComponent, HeaderComponent, FooterComponent, RouterOutlet, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Manually restore the scroll position to the top or custom logic
        window.scrollTo(0, 0);  // Scroll to the top on every navigation
      }
    });
  }
  
}
