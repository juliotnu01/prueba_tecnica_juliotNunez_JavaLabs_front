import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserService, User, Transaction } from './services/user.service';
import { ToastComponent } from './components/toast/toast.component';

interface Toast {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  transactionForm: FormGroup;
  loading = false;
  selectedUser: User | null = null;
  userTransactions: Transaction[] = [];
  toast: Toast = {
    show: false,
    message: '',
    type: 'success'
  };
  showUserForm = false;
  showTransactionForm = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      type: ['deposit', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        this.showToast('Error cargando usuarios', 'error');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loading = true;
      this.userService.addUser(this.userForm.value).subscribe({
        next: () => {
          this.loadUsers();
          this.userForm.reset();
          this.loading = false;
          this.showToast('Usuario creado exitosamente', 'success');
        },
        error: (error) => {
          this.showToast('Error añadiendo usuario', 'error');
          this.loading = false;
        }
      });
    }
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    this.loadUserTransactions(user.id!);
  }

  loadUserTransactions(userId: number): void {
    this.userService.getUserTransactions(userId).subscribe({
      next: (transactions) => {
        this.userTransactions = transactions;
      },
      error: (error) => {
        this.showToast('Error cargando transacciones', 'error');
      }
    });
  }

  createTransaction(): void {
    if (this.transactionForm.valid && this.selectedUser) {
      const transaction = {
        user_id: this.selectedUser.id!,
        amount: this.transactionForm.value.amount,
        type: this.transactionForm.value.type
      };

      this.userService.createTransaction(transaction).subscribe({
        next: (response) => {
          this.showToast(response.message, 'success');
          this.loadUserTransactions(this.selectedUser!.id!);
          this.transactionForm.reset({ type: 'deposit' });
        },
        error: (error) => {
          this.showToast('Error creando transacción', 'error');
        }
      });
    }
  }

  showToast(message: string, type: 'success' | 'error'): void {
    this.toast = { show: true, message, type } as Toast;
    setTimeout(() => {
      this.toast.show = false;
    }, 3000);
  }

  getCurrentBalance(): string {
    if (this.userTransactions.length > 0) {
      return this.userTransactions[0].balance_after_transaction;
    }
    return '0.00';
  }
}
