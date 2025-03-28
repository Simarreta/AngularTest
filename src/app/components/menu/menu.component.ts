import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnChanges {
  @Input() isMenuOpen: boolean = false;
  @Input() activeMenu: string = 'songs'; // Por defecto, la sección activa es Canciones
  
  @Output() menuSelected = new EventEmitter<string>();
  @Output() menuClosed = new EventEmitter<void>();
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isMenuOpen']) {
      if (!this.isMenuOpen) {
        // Asegurarse de que el overlay se oculte cuando el menú se cierra
        const overlay = document.querySelector('.menu-overlay') as HTMLElement;
        if (overlay) {
          overlay.classList.remove('active');
        }
      }
    }
  }

  /**
   * Selecciona una opción del menú y emite el evento
   */
  selectMenu(option: string): void {
    this.activeMenu = option;
    this.menuSelected.emit(option);
    console.log('Opción seleccionada:', option);
    
    // En dispositivos móviles, cerramos el menú después de seleccionar una opción
    if (window.innerWidth < 768) {
      this.closeMenu();
    }
  }
  
  /**
   * Cierra el menú y emite el evento
   */
  closeMenu(): void {
    console.log('Cerrando menú');
    this.menuClosed.emit();
  }
}
