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
import { AuthGuard, LoggedIn } from "./auth-guard.service";
import { NotExpr } from "@angular/compiler";
import { NotFoundComponent } from "./not-found/not-found.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PhotoComponent } from "./profile-page/photo/photo.component";


export const routes:Routes=[
    {
        path:'',
        component:HomePageComponent
    },
    {
        path:'course/:courseId',
        component:CourseDetailPageComponent,
        canActivate:[LoggedIn],
    },
    {
        path:'profile',
        component:ProfilePageComponent,
        canActivate:[LoggedIn],
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
                path:'edit-photo',
                component:PhotoComponent
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
        path:'dashboard',
        component:DashboardComponent
    },
    {
        path:'courses',
        component:CoursesComponent
    },
    {
        path:'login',
        component:LoginComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'register/:role',
        component:RegisterComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'**',
        component:NotFoundComponent
    }
]