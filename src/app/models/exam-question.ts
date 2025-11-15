export interface ExamQuestion {
    id: number;
  text: string;
  choices: string[];
  correctIndex: number;
  selectedIndex?: number;
}
