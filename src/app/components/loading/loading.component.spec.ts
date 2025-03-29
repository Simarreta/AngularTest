import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
      schemas: [NO_ERRORS_SCHEMA] // Permite ignorar elementos desconocidos en las plantillas
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate correct diameter based on size', () => {
    // Probar tamaño pequeño
    component.size = 'small';
    expect(component.getDiameter()).toBe(36);
    
    // Probar tamaño mediano (por defecto)
    component.size = 'medium';
    expect(component.getDiameter()).toBe(56);
    
    // Probar tamaño grande
    component.size = 'large';
    expect(component.getDiameter()).toBe(80);
  });

  it('should have default values', () => {
    expect(component.type).toBe('spinner');
    expect(component.size).toBe('medium');
    expect(component.color).toBe('primary');
    expect(component.mode).toBe('indeterminate');
    expect(component.overlay).toBe(false);
  });

  it('should set overlay property correctly', () => {
    component.overlay = true;
    expect(component.overlay).toBe(true);
  });
}); 