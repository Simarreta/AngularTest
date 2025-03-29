import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    this.menuSelected.emit(option);
    
    // En dispositivos móviles, siempre cerramos el menú después de seleccionar
    if (window.innerWidth < 768) {
      this.closeMenu();
    }
  }
  
  /**
   * Cierra el menú y emite el evento
   */
  closeMenu(): void {
    this.menuClosed.emit();
  }
}
