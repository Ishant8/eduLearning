import { Component } from '@angular/core';
import { AchievementsComponent } from "../home-page/achievements/achievements.component";

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [AchievementsComponent],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent {

}
