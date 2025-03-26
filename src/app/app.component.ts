import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MusicApp';
  isDesktop: boolean = false;
  isTablet: boolean = false;
  isMobile: boolean = true;
  isMenuOpen: boolean = false;
  currentView: string = 'canciones'; // Vista predeterminada
  
  ngOnInit() {
    this.checkScreenSize();
  }

  // Listener para cambios de tamaño de pantalla
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const width = window.innerWidth;
    
    // Guardar el estado previo
    const wasDesktop = this.isDesktop;
    const wasTablet = this.isTablet;
    const wasMobile = this.isMobile;
    
    // Actualizar el estado actual
    this.isDesktop = width >= 1024;
    this.isTablet = width >= 768 && width < 1024;
    this.isMobile = width < 768;
    
    // Registrar cambio de dispositivo
    if (this.isDesktop && !wasDesktop) {
      console.log('Cambiado a vista desktop');
      this.isMenuOpen = false; // Cerramos menú móvil al cambiar a desktop
    } 
    else if (this.isTablet && !wasTablet) {
      console.log('Cambiado a vista tablet');
      this.isMenuOpen = false; // Cerramos menú móvil al cambiar a tablet
    }
    else if (this.isMobile && !wasMobile) {
      console.log('Cambiado a vista móvil');
    }
  }

  // Método para navegar entre vistas
  navigateTo(view: string) {
    this.currentView = view;
    console.log(`Navegando a: ${view}`);
    
    // Si estamos en móvil, cerrar el menú después de navegar
    if (!this.isDesktop) {
      this.closeMenu();
    }
  }

  // Métodos para el menú móvil
  toggleMenu() {
    console.log('Toggle menu llamado, estado actual:', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;
    console.log(`Menú ${this.isMenuOpen ? 'abierto' : 'cerrado'}`);
    
    // Si estamos abriendo el menú móvil, evitar scroll en el body
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
      console.log('Bloqueando scroll del body');
    } else {
      document.body.style.overflow = '';
      console.log('Permitiendo scroll del body');
    }
    
    // Forzar un reflow para asegurar que la clase se aplique correctamente
    setTimeout(() => {
      console.log('Estado del menú después del timeout:', this.isMenuOpen);
    }, 10);
  }

  closeMenu() {
    console.log('closeMenu llamado, estado actual:', this.isMenuOpen);
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
      console.log('Menú cerrado y scroll permitido');
    }
  }
}
