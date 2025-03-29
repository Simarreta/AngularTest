import { TestBed } from '@angular/core/testing';
import { LoadingService, LoadingState } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('global loading state', () => {
    it('should show loading state', (done) => {
      // Inicialmente el estado de carga debe estar oculto
      service.loading$.subscribe((state: LoadingState) => {
        expect(state.show).toBeFalsy();
        done();
      });
    });

    it('should update loading state when showLoading is called', (done) => {
      const testMessage = 'Test loading message';
      
      // Mostrar el estado de carga
      service.showLoading(testMessage, 'spinner', true);

      // Verificar que el estado de carga se actualice
      service.loading$.subscribe((state: LoadingState) => {
        expect(state.show).toBeTruthy();
        expect(state.message).toBe(testMessage);
        expect(state.type).toBe('spinner');
        expect(state.overlay).toBeTruthy();
        done();
      });
    });

    it('should hide loading state when hideLoading is called', (done) => {
      // Primero mostrar el estado de carga
      service.showLoading('Test', 'spinner', true);
      
      // Luego ocultarlo
      service.hideLoading();

      // Verificar que el estado de carga se oculte
      service.loading$.subscribe((state: LoadingState) => {
        expect(state.show).toBeFalsy();
        done();
      });
    });
  });

  describe('named loading states', () => {
    const testName = 'testLoader';
    
    it('should create a named loading state if it does not exist', (done) => {
      service.getNamedLoadingState(testName).subscribe((state: LoadingState) => {
        expect(state.show).toBeFalsy();
        done();
      });
    });

    it('should show a named loading state', (done) => {
      // Mostrar un estado de carga con nombre
      service.showNamedLoading(testName, 'Test message');

      // Verificar que el estado se actualice
      service.getNamedLoadingState(testName).subscribe((state: LoadingState) => {
        expect(state.show).toBeTruthy();
        expect(state.message).toBe('Test message');
        expect(state.type).toBe('spinner');
        done();
      });
    });

    it('should hide a named loading state', (done) => {
      // Primero mostrar el estado
      service.showNamedLoading(testName);
      
      // Luego ocultarlo
      service.hideNamedLoading(testName);

      // Verificar que se oculte
      service.getNamedLoadingState(testName).subscribe((state: LoadingState) => {
        expect(state.show).toBeFalsy();
        done();
      });
    });
  });
}); 