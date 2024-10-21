import {NgFor, NgIf} from '@angular/common';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MenuDesktopComponent } from './Components/shared/menu-desktop/menu-desktop.component';
import { MenuMobileComponent } from './Components/shared/menu-mobile/menu-mobile.component';
import { SliderHomeComponent } from './Components/slider-home/slider-home.component';
import {NgClass} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuMobileBackComponent } from './Components/shared/menu-mobile-back/menu-mobile-back.component';

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [
    RouterOutlet, 
    NgIf, 
    NgClass,
    NgFor,
    MenuMobileBackComponent,
    MenuDesktopComponent,
    MenuMobileComponent,
    SliderHomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ClockTime';
  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {

    this.breakpointObserver.observe([
      Breakpoints.Handset 
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

}
