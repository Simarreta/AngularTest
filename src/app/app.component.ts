import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent, TranslocoModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MusicApp';
  isDesktop: boolean = false;
  isTablet: boolean = false;
  isMobile: boolean = true;
  isMenuOpen: boolean = false;
  currentView: string = 'home';

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    const width = window.innerWidth;
    this.isDesktop = width >= 1024;
    this.isTablet = width >= 768 && width < 1024;
    this.isMobile = width < 768;
    
    // Cerrar el menú si cambiamos a modo móvil
    if (this.isMobile && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  navigateTo(view: string) {
    this.currentView = view;
    if (view === 'canciones') {
      this.router.navigate(['/songs']);
    } else {
      this.router.navigate(['/']);
    }
    
    // Si estamos en móvil, cerrar el menú después de navegar
    if (this.isMobile) {
      this.closeMenu();
    }
  }
}
