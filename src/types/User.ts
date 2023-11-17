export interface User {
  id: string,
  email: string;
  role: string;
  adminComments: string[];
  fullName: string;
  phoneNumber: string;
  address: string;
  likedGames: string[];
  cartGames: string[];
  orders: string[];
  completedOrders: number;
  shouldLeaveReview: boolean;
  userReviews: string[];
  isArchived: boolean;
  isBanned: boolean;
  activationToken: string;
  createdAt: Date,
  updatedAt: Date,
  __v: number,
}
