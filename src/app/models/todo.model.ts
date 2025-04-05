export interface Todo {
  id: number;
  title: string;
  description?: string;
  goalDate?: Date;
  isSelected?: boolean;
}
