
export interface ITask {
  title: string
  description: string
}

export interface Task {
  _id: string;
  project_id?: string;
  createdAt: string;
  name: string;
  status: string;
  description?: string
};