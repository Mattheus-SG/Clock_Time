import { Component, Input } from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { UtilsService } from '../../../Services/utils.service';

@Component({
  selector: 'app-menu-mobile-back',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './menu-mobile-back.component.html',
  styleUrl: './menu-mobile-back.component.scss'
})
export class MenuMobileBackComponent {
  @Input() pageTitle: string = '';
  isMobile: boolean = false;

  constructor(private location: Location, private breakpointService: UtilsService) {}

  ngOnInit(): void {
    // Subscrição ao observable para atualizar isMobile
    this.breakpointService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  goBack() {
    this.location.back();
  }


}
