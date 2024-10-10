import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { CourseDetailPageComponent } from "./course-detail-page/course-detail-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { EditProfileComponent } from "./profile-page/edit-profile/edit-profile.component";
import { AccountSecurityComponent } from "./profile-page/account-security/account-security.component";
import { DeleteAccountComponent } from "./profile-page/delete-account/delete-account.component";

export const routes:Routes=[
    {
        path:'',
        component:HomePageComponent
    },
    {
        path:'course',
        component:CourseDetailPageComponent
    },
    {
        path:'profile',
        component:ProfilePageComponent,
        children:[
            
            {
                path:'edit',
                component:EditProfileComponent
            },
            {
                path:'security',
                component:AccountSecurityComponent
            },
            {
                path:'delete',
                component:DeleteAccountComponent
            }
        ]
    }
]