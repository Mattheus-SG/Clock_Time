import { Component } from '@angular/core';
import { CameraCaptureComponent } from '../capture-camera/capture-camera.component';

@Component({
  selector: 'app-set-out',
  standalone: true,
  imports: [
    CameraCaptureComponent
  ],
  templateUrl: './set-out.component.html',
  styleUrl: './set-out.component.scss'
})
export class SetOutComponent {

}
