export interface ExamQuestion {
    id: number;
  text: string;
  choices: string[];
  correctIndex: number;
  selectedIndex?: number;
}
export enum QuestionType {
  MultipleChoice = 0,
  TrueFalse = 1,
  ShortAnswer = 2
}

export interface QuizDetailsDto {
  quiz_Id: number;
  quiz_Name: string;
  totalMarks: number;
  duration: number;
  lesson_Id: number;
  lesson_Name: string;
  questions: QuestionDto[];
}

export interface CreateQuizDto {
  quiz_Name: string;
  lesson_Id: number;
  totalMarks: number;
  duration: number;
}

export interface UpdateQuizDto {
  quiz_Id: number;
  quiz_Name: string;
  totalMarks: number;
  duration: number;
}

export interface QuestionDto {
  question_Id: number;
  question_Text: string;
  question_Type: QuestionType;
  grade_Point: number;
  choices: ChoiceDto[];
}

export interface CreateQuestionDto {
  quiz_Id: number;
  question_Text: string;
  question_Type: QuestionType;
  grade_Point: number;
  correctAnswer: string;
  choices: CreateChoiceDto[];
}

export interface ChoiceDto {
  choiceId: number;
  choiceText: string;
  isCorrect: boolean;
}

export interface CreateChoiceDto {
  choiceText: string;
  isCorrect: boolean;
}

export interface SubmitAnswerDto {
  quiz_Id: number;
  question_Id: number;
  choice_Id: number;
}

export interface QuizResultDto {
  quiz_Id: number;
  quiz_Name: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  answers: StudentAnswerResultDto[];
   aiReport?: string; 
}

export interface StudentAnswerResultDto {
  question_Id: number;
  question_Text: string;
  choice_Id: number;
  choice_Text: string;
  is_Correct: boolean;
  grade_Point: number;
  correctAnswer: string;
}

export interface StartQuizDto {
  quiz_Id: number;
  quiz_Name: string;
  duration: number;
  totalMarks: number;
  startTime: Date;
  endTime: Date;
  questions: QuestionDto[];
}
