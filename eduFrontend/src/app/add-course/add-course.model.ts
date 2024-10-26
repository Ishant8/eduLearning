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
  subSectionName: string;
  content: string;
  sectionName:string|null;
}

export interface AddSection {
  sectionName: string;
  sectionDescription: string;
  courseName:string|null;
  subSections: AddSubSection[];
}
