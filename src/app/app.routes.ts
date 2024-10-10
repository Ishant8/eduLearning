import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { CourseDetailPageComponent } from "./course-detail-page/course-detail-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { EditProfileComponent } from "./profile-page/edit-profile/edit-profile.component";
import { AccountSecurityComponent } from "./profile-page/account-security/account-security.component";
import { DeleteAccountComponent } from "./profile-page/delete-account/delete-account.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CoursesComponent } from "./courses/courses.component";

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
                path:'',
                redirectTo:'edit',
                pathMatch:'prefix'
            },
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
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'courses',
        component:CoursesComponent
    }
]