export interface AddCourse {
  courseName: string;
  categoryName: string;
  level: string;
  sections: number;
  hours: number;
  price: number;
  courseDescription: string;
  instructorDetails: { [id: number]: string };
}

export interface AddSubSection {
  id:number;
  subSectionName: string;
  content: string;
  sectionName:string|null;
}

export interface AddSection {
  sectionId:number;
  sectionName: string;
  sectionDescription: string;
  courseName:string|null;
  subSections: AddSubSection[];
}
