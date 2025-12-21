export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  availability: string;
}
