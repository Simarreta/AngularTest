import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GlobalLoaderComponent } from './global-loader.component';
import { LoadingComponent } from '../loading/loading.component';
import { LoadingService, LoadingState } from '../../services/loading.service';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';

describe('GlobalLoaderComponent', () => {
  let component: GlobalLoaderComponent;
  let fixture: ComponentFixture<GlobalLoaderComponent>;
  let loadingService: LoadingService;
  let loadingSubject: BehaviorSubject<LoadingState>;

  beforeEach(async () => {
    // Crear un BehaviorSubject para simular el observable loading$
    loadingSubject = new BehaviorSubject<LoadingState>({ show: false });
    
    // Crear mock para LoadingService
    const loadingServiceMock = {
      showLoading: jest.fn(),
      hideLoading: jest.fn(),
      loading$: loadingSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [
        GlobalLoaderComponent,
        // Usar un componente simulado para LoadingComponent
        MockComponent(LoadingComponent)
      ],
      providers: [
        { provide: LoadingService, useValue: loadingServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalLoaderComponent);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show loading component initially', () => {
    // Inicialmente, loadingState.show debe ser false
    expect(component.loadingState.show).toBeFalsy();
    
    // Verificar que no se muestre el componente de carga
    const loadingComponent = fixture.debugElement.query(By.directive(LoadingComponent));
    expect(loadingComponent).toBeFalsy();
  });

  it('should show loading component when loadingState.show is true', () => {
    // Simular un cambio en el estado de carga
    loadingSubject.next({ 
      show: true, 
      message: 'Test loading', 
      type: 'spinner', 
      overlay: true 
    });
    
    // Detectar cambios para que se actualice la vista
    fixture.detectChanges();
    
    // Verificar que el estado de carga se haya actualizado
    expect(component.loadingState.show).toBeTruthy();
    
    // Verificar que se muestre el componente de carga
    const loadingComponent = fixture.debugElement.query(By.directive(LoadingComponent));
    expect(loadingComponent).toBeTruthy();
    
    // Verificar que se pasen las propiedades correctas
    const loadingInstance = loadingComponent.componentInstance;
    expect(loadingInstance.type).toBe('spinner');
    expect(loadingInstance.message).toBe('Test loading');
    expect(loadingInstance.overlay).toBeTruthy();
  });

  it('should hide loading component when loadingState.show changes to false', () => {
    // Primero mostrar el componente de carga
    loadingSubject.next({ show: true });
    fixture.detectChanges();
    
    // Verificar que se muestre
    let loadingComponent = fixture.debugElement.query(By.directive(LoadingComponent));
    expect(loadingComponent).toBeTruthy();
    
    // Luego ocultar el componente de carga
    loadingSubject.next({ show: false });
    fixture.detectChanges();
    
    // Verificar que ya no se muestre
    loadingComponent = fixture.debugElement.query(By.directive(LoadingComponent));
    expect(loadingComponent).toBeFalsy();
  });
}); 