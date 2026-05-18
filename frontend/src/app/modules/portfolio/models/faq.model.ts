export interface Faq {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  category?: string;
  order?: number;
  icon?: string;
}
