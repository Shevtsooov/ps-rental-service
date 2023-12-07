export interface Review {
  _id: string,
  userId: string;
  status: string;
  stars: number;
  comment: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
};
