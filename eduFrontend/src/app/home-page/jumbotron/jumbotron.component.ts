import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../profile-page/profile.service';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.css'
})
export class JumbotronComponent {
  private profileService = inject(ProfileService);

  userDet = computed(()=>this.profileService.profile());
  title = input.required()
  description = input.required()
  buttonType = input()
}
