export interface Course{
    courseId: number,
    courseName: string,
    categoryName: string,
    courseDescription: string,
    hours: number,
    sections: number;
    price: number,
    level: string,
    instructorEmail:string;
    coverImage: string,
    profileImage:string,
    createDate: string,
    updateDate: string,
    instructorDetails: {[id: number]: string;},
    reviews:{reviewId:number, comment:string, userName:string, userId:number, courseId:number, rating:number}[];
}