import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoadingState {
  show: boolean;
  message?: string;
  type?: 'spinner' | 'bar' | 'skeleton';
  overlay?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // Global loading state
  private loadingSubject = new BehaviorSubject<LoadingState>({ show: false });
  loading$: Observable<LoadingState> = this.loadingSubject.asObservable();

  // Named loading states for specific features or components
  private loadingMap = new Map<string, BehaviorSubject<LoadingState>>();

  constructor() { }

  // Show the global loading indicator
  showLoading(message?: string, type: 'spinner' | 'bar' | 'skeleton' = 'spinner', overlay = false): void {
    this.loadingSubject.next({ show: true, message, type, overlay });
  }

  // Hide the global loading indicator
  hideLoading(): void {
    this.loadingSubject.next({ show: false });
  }

  // Get or create a named loading state
  getNamedLoadingState(name: string): Observable<LoadingState> {
    if (!this.loadingMap.has(name)) {
      this.loadingMap.set(name, new BehaviorSubject<LoadingState>({ show: false }));
    }
    return this.loadingMap.get(name)!.asObservable();
  }

  // Show a named loading indicator
  showNamedLoading(name: string, message?: string, type: 'spinner' | 'bar' | 'skeleton' = 'spinner', overlay = false): void {
    if (!this.loadingMap.has(name)) {
      this.loadingMap.set(name, new BehaviorSubject<LoadingState>({ show: true, message, type, overlay }));
    } else {
      this.loadingMap.get(name)!.next({ show: true, message, type, overlay });
    }
  }

  // Hide a named loading indicator
  hideNamedLoading(name: string): void {
    if (this.loadingMap.has(name)) {
      this.loadingMap.get(name)!.next({ show: false });
    }
  }
} 