
export interface ITask {
  title: string
  description: string
}

export interface Task {
  _id: string;
  project_id?: string;
  due_date: string;
  name: string;
  status: string;
  description?: string;
  // assigned_id?: string;
};