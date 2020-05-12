export interface Note {
  _id: string;
  content: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
  updateMode?: boolean;
}
