import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MenuComponent } from './menu.component';
import { LoadingService } from '../../services/loading.service';
import { Router } from '@angular/router';
import { 
  TranslocoTestingModule, 
  TranslocoTestingOptions 
} from '@ngneat/transloco';
import { NO_ERRORS_SCHEMA } from '@angular/core';

// Configuración de TranslocoTestingModule
const translocoConfig: TranslocoTestingOptions = {
  langs: {
    es: {
      'menu.title': 'Menú',
      'menu.items.songs': 'Canciones',
      'menu.items.artists': 'Artistas',
      'menu.items.recordCompanies': 'Compañías discográficas'
    },
    en: {
      'menu.title': 'Menu',
      'menu.items.songs': 'Songs',
      'menu.items.artists': 'Artists',
      'menu.items.recordCompanies': 'Record Companies'
    }
  },
  preloadLangs: true
};

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let loadingService: LoadingService;
  let router: Router;

  beforeEach(async () => {
    const loadingServiceMock = {
      showLoading: jest.fn(),
      hideLoading: jest.fn()
    };

    const routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        MenuComponent,
        TranslocoTestingModule.forRoot(translocoConfig)
      ],
      providers: [
        { provide: LoadingService, useValue: loadingServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit menuSelected event when selecting a menu option other than "canciones"', () => {
    const menuSelectedSpy = jest.spyOn(component.menuSelected, 'emit');
    component.selectMenu('artistas');
    expect(menuSelectedSpy).toHaveBeenCalledWith('artistas');
  });

  it('should emit menuClosed event when closeMenu is called', () => {
    const menuClosedSpy = jest.spyOn(component.menuClosed, 'emit');
    component.closeMenu();
    expect(menuClosedSpy).toHaveBeenCalled();
  });

  it('should show spinner and navigate when selecting "canciones"', fakeAsync(() => {
    // Espiar el método showSpinnerAndNavigate
    const navigateSpy = jest.spyOn(component, 'showSpinnerAndNavigate');
    
    // Seleccionar la opción 'canciones'
    component.selectMenu('canciones');
    
    // Verificar que se llame al método para mostrar el spinner
    expect(navigateSpy).toHaveBeenCalledWith('/songs');
    
    // Verificar que se muestre el spinner
    expect(loadingService.showLoading).toHaveBeenCalledWith(
      'Cargando lista de canciones...',
      'spinner',
      true
    );
    
    // Avanzar el tiempo para simular el setTimeout
    tick(500);
    
    // Verificar que se navegue a la ruta correcta
    expect(router.navigate).toHaveBeenCalledWith(['/songs']);
    
    // Avanzar más tiempo para el segundo setTimeout
    tick(1000);
    
    // Verificar que se oculte el spinner
    expect(loadingService.hideLoading).toHaveBeenCalled();
  }));

  it('should close menu on mobile devices when selecting an option', () => {
    // Simular un dispositivo móvil
    Object.defineProperty(window, 'innerWidth', { value: 600 });
    
    // Espiar el método closeMenu
    const closeMenuSpy = jest.spyOn(component, 'closeMenu');
    
    // Seleccionar una opción que no sea 'canciones'
    component.selectMenu('artistas');
    
    // Verificar que se cierre el menú
    expect(closeMenuSpy).toHaveBeenCalled();
  });

  it('should render menu items with translated text', () => {
    fixture.detectChanges();
    
    // Obtener los elementos del menú
    const menuItems = fixture.debugElement.queryAll(By.css('.menu-options li a'));
    
    // Verificar que haya al menos un elemento
    expect(menuItems.length).toBeGreaterThan(0);
  });
});
