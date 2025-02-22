import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  amount: string;
  type: 'deposit' | 'withdrawal';
  created_at: string;
  balance_after_transaction: string;
}

export interface TransactionResponse {
  message: string;
  transaction: Transaction;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/add`, user);
  }

  getUserTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/${userId}`);
  }

  createTransaction(transaction: { user_id: number; amount: number; type: 'deposit' | 'withdrawal' }): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.apiUrl}/transactions`, transaction);
  }
} 