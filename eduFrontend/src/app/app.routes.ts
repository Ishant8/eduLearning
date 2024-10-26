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
import { AddCourseComponent } from "./add-course/add-course.component";
import { CoursePathComponent } from "./course-path/course-path.component";
import { CourseContentComponent } from "./course-content/course-content.component";


export const routes:Routes=[
    {
        path:'',
        component:HomePageComponent
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
        component:DashboardComponent,
        canActivate:[LoggedIn],

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
        path:'course/add',
        component:AddCourseComponent,
        canActivate:[LoggedIn]
    },
    {
        path:'course/path',
        component:CoursePathComponent
    },
    {
        path:'course/content',
        component:CourseContentComponent
    },
    {
        path:'course/:courseId',
        component:CourseDetailPageComponent,
        canActivate:[LoggedIn],
    },
    {
        path:'course/edit/:courseId',
        component:AddCourseComponent,
        canActivate:[LoggedIn]
    },
    {
        path:'section/get/course',
        component:CoursePathComponent
    },
    {
        path:'**',
        component:NotFoundComponent
    }
]