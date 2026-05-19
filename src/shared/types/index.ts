export type Role = "ADMIN" | "PAYMENT" | "REPORTS";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Role[];
}

export interface Payment {
  id: number;
  userId: number;
  amount: number;
  currency: string;
  status: "success" | "pending" | "failed";
  date: string;
  description: string;
}
