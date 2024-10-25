

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
  subSectionTitle: string;
  subSectionContent: string;
}

export interface AddSection {
  sectionName: string;
  sectionDescription: string;
  subSections: AddSubSection[];
}
