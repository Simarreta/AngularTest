import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  template: `
    <div class="loading-container" [ngClass]="{'overlay': overlay}">
      <div class="loading-content" [ngClass]="size">
        <ng-container [ngSwitch]="type">
          <!-- Spinner -->
          <mat-spinner *ngSwitchCase="'spinner'" [diameter]="getDiameter()" [color]="color"></mat-spinner>
          
          <!-- Progress Bar -->
          <mat-progress-bar *ngSwitchCase="'bar'" [color]="color" [mode]="mode"></mat-progress-bar>
          
          <!-- Skeleton Loader -->
          <div *ngSwitchCase="'skeleton'" class="skeleton-loader" [style.height.px]="height" [style.width.px]="width"></div>
          
          <!-- Default to spinner if no type specified -->
          <mat-spinner *ngSwitchDefault [diameter]="getDiameter()" [color]="color"></mat-spinner>
        </ng-container>
        
        <div *ngIf="message" class="loading-message">{{ message }}</div>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    
    .loading-container.overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 9999;
    }
    
    .loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
      border-radius: 8px;
    }
    
    .loading-content.small {
      transform: scale(0.7);
    }
    
    .loading-content.large {
      transform: scale(1.5);
    }
    
    .loading-message {
      margin-top: 20px;
      text-align: center;
      color: rgba(0, 0, 0, 0.87);
      font-size: 18px;
      font-weight: 500;
    }
    
    .skeleton-loader {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 4px;
      min-height: 20px;
      min-width: 200px;
    }
    
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    
    .overlay .loading-content {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .overlay .loading-message {
      color: white;
      font-size: 20px;
      font-weight: 600;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
  `]
})
export class LoadingComponent {
  @Input() type: 'spinner' | 'bar' | 'skeleton' = 'spinner';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate';
  @Input() overlay = false;
  @Input() message?: string;
  @Input() height?: number;
  @Input() width?: number;
  
  getDiameter(): number {
    switch (this.size) {
      case 'small': return 36;
      case 'large': return 80;
      default: return 56;
    }
  }
} 