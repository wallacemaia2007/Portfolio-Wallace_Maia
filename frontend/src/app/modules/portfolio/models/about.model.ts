export interface JourneyItem {
  year: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon?: string;
  type: 'education' | 'achievement' | 'learning' | 'milestone';
}

export interface Education {
  id: string;
  institution: string;
  course: string;
  courseEn: string;
  certificateUrl?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  descriptionEn?: string;
  location?: string;
}

export interface Value {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export interface Hobby {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  emoji?: string;
}

export interface AboutInfo {
  id?: number;
  introduction: string;
  introductionEn: string;
  profileImage?: string;
  backgroundImage?: string;
  aboutTexts: string[];
  aboutTextsEn: string[];
  journeyItems: JourneyItem[];
  educationList: Education[];
  values: Value[];
  hobbies: Hobby[];
  futureGoals?: string[];
  futureGoalsEn?: string[];
  philosophyTitle?: string;
  philosophyTitleEn?: string;
  philosophyText?: string;
  philosophyTextEn?: string;
}
