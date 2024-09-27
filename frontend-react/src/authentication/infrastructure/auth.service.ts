// Mock API calls - Replace with actual API endpoints

import { User } from "../domain/authentication.domain";

export const login = async (email: string, document: string) => {
  return new Promise<{ token: string; user: User }>((resolve, reject) => {
    setTimeout(() => {
      if (email === 'user@example.com' && +document > 0) {
        resolve({
          token: 'fake-jwt-token', user: {
            id: '1',
            name: 'John Doe', email: 'user@example.com', phone: "123456789", document: "123456789", createdAt: new Date(), updatedAt: new Date()
          }
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const register = async (name: string, email: string, document: string, phone: string) => {
  return new Promise<{ user: User}>((resolve, reject) => {
    setTimeout(() => {
      if (email !== 'existing@example.com') {
        resolve({ user: { id: '2', name, email, phone, document, createdAt: new Date(), updatedAt: new Date() } });
      } else {
        reject(new Error('Email already exists'));
      }
    }, 1000);
  });
};
