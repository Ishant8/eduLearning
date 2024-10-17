export interface Profile{
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role:string;
    courseNames:string[];
    profileImage: string;
}