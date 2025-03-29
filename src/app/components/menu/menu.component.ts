import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslocoModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnChanges {
  @Input() isMenuOpen: boolean = false;
  @Input() activeMenu: string = 'songs'; // Por defecto, la sección activa es Canciones
  
  @Output() menuSelected = new EventEmitter<string>();
  @Output() menuClosed = new EventEmitter<void>();
  
  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {}
  
  // Detectar cambios de tamaño de la ventana
  @HostListener('window:resize')
  onResize() {
    const width = window.innerWidth;
    if (width < 768 && this.isMenuOpen) {
      // Estamos en móvil y el menú está abierto, cerrarlo
      this.closeMenu();
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isMenuOpen']) {
      // Asegurarse de que el overlay se maneje correctamente cuando el menú cambia
      const overlay = document.querySelector('.menu-overlay') as HTMLElement;
      if (overlay) {
        if (this.isMenuOpen) {
          overlay.classList.add('active');
        } else {
          overlay.classList.remove('active');
        }
      }
      
      // Si estamos en móvil y el menú se cierra, asegurarnos de que el body pueda hacer scroll de nuevo
      if (!this.isMenuOpen && window.innerWidth < 768) {
        document.body.style.overflow = '';
      }
    }
  }

  /**
   * Selecciona una opción del menú y emite el evento
   */
  selectMenu(option: string): void {
    this.activeMenu = option;
    
    // Si selecciona "canciones", mostrar el spinner primero
    if (option === 'canciones') {
      this.showSpinnerAndNavigate('/songs');
    } else {
      this.menuSelected.emit(option);
      
      // En dispositivos móviles, siempre cerramos el menú después de seleccionar
      if (window.innerWidth < 768) {
        this.closeMenu();
      }
    }
  }
  
  /**
   * Mostrar el spinner y luego navegar
   */
  showSpinnerAndNavigate(route: string): void {
    // Mostrar el spinner global con overlay completo
    this.loadingService.showLoading('Cargando lista de canciones...', 'spinner', true);
    
    // Cerrar el menú primero si es necesario
    if (window.innerWidth < 768) {
      this.closeMenu();
    }
    
    // Emitir el evento para que la aplicación sepa qué opción se seleccionó
    this.menuSelected.emit('canciones');
    
    // Esperar un poco antes de navegar para que se vea el spinner
    setTimeout(() => {
      // Navegar a la ruta
      this.router.navigate([route]);
      
      // Mantener el spinner visible durante un tiempo adicional para dar sensación de carga
      setTimeout(() => {
        this.loadingService.hideLoading();
      }, 1000);
    }, 500);
  }
  
  /**
   * Cierra el menú y emite el evento
   */
  closeMenu(): void {
    this.menuClosed.emit();
  }
}
