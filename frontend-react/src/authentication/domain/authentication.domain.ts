export interface User {
  id: string; 
  document: string;
  name: string; 
  email: string;
  phone: string; 
  profilePicture?: string | null;
  createdAt: Date; 
  updatedAt: Date; 
  deletedAt?: Date | null;
}

export interface LoginFromData {
  email: string,
  document: string
}
export interface RegisterFormData {
  email: string,
  document: string,
  name: string,
  phone: string
}
