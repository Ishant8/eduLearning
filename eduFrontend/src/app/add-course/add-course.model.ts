

export interface AddCourse {
  courseName: string;
  categoryName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  sections: number;
  hours: number;
  price: number;
  courseDescription: string;
  instructorDetails: { [id: number]: string };
}

export interface AddSubSection {
  subSectionName: string;
  content: string;
  sectionName:null;
}

export interface AddSection {
  sectionName: string;
  sectionDescription: string;
  courseName:null;
  subSections: AddSubSection[];
}
