import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService, LoadingState } from '../../services/loading.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent
  ],
  template: `
    <app-loading 
      *ngIf="loadingState.show"
      [type]="loadingState.type || 'spinner'"
      [size]="'large'"
      [color]="'primary'"
      [message]="loadingState.message"
      [overlay]="loadingState.overlay || true">
    </app-loading>
  `,
  styles: [`
    :host {
      position: fixed;
      z-index: 9999;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }
    
    :host ::ng-deep .loading-container.overlay {
      pointer-events: all;
    }
  `]
})
export class GlobalLoaderComponent implements OnInit {
  loadingState: LoadingState = { show: false };

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe(state => {
      this.loadingState = state;
    });
  }
} 