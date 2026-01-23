export interface JourneyItem {
  year: string;
  title: string;
  description: string;
  icon?: string;
  type: 'education' | 'achievement' | 'learning' | 'milestone';
}

export interface Education {
  id: string;
  institution: string;
  course: string;
  certificateUrl?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  location?: string;
}

export interface Value {
  id: string;
  title: string;
  description: string;
}

export interface Hobby {
  id: string;
  name: string;
  description: string;
  emoji?: string;
}

export interface AboutInfo {
  id?: number;
  introduction: string;
  profileImage?: string;
  backgroundImage?: string;
  aboutTexts: string[];
  journeyItems: JourneyItem[];
  educationList: Education[];
  values: Value[];
  hobbies: Hobby[];
  philosophyTitle: string;
  philosophyText: string;
  futureGoals: string[];
}
