export interface AddCourse{
    courseName:string;
    categoryName:string;
    level:"Beginner"|"Intermediate"|"Advanced";
    sections:number;
    hours:number;
    price:number;
    courseDescription:string;
    instructorDetails:{[id:number]:string};
}