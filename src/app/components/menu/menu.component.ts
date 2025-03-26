import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnChanges {
  @Input() isMenuOpen: boolean = false;
  @Input() activeMenu: string = 'canciones'; // Por defecto, la sección activa es Canciones
  
  @Output() menuSelected = new EventEmitter<string>();
  @Output() menuClosed = new EventEmitter<void>();
  
  ngOnChanges(changes: SimpleChanges): void {
    // Cuando isMenuOpen cambia, asegurarnos de que el overlay también se actualice
    if (changes['isMenuOpen']) {
      console.log('Estado del menú cambiado:', this.isMenuOpen);
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
