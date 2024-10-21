import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { FaceDetectService } from '../../Services/FaceDetectService/face-detect.service';
import { MenuMobileBackComponent } from '../shared/menu-mobile-back/menu-mobile-back.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalRegisterComponent } from '../Modals/modal-register/modal-register.component';

@Component({
  selector: 'app-save-photos',
  standalone: true,
  imports: [ MenuMobileBackComponent , NgIf, ModalRegisterComponent ],
  templateUrl: './save-photos.component.html',
  styleUrl: './save-photos.component.scss'
})
export class SavePhotosComponent {

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  isCameraActive = false;
  public countPhotos = 0;
  countString = '0';
  public photos: File[] = [];
  modalRef?: BsModalRef;
  
  constructor(private faceRecognitionService: FaceDetectService, private cdr: ChangeDetectorRef, private router : Router, private modalService : BsModalService) { }
  

  ngOnInit(){
    this.photos = [];
    if(this.photos.length === 3){
      console.log("ENTREI")
    }

    console.log("PHOTOS: ", this.photos.length)
    console.log("COUNT", this.countPhotos)

  }
  
  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.play();
        this.isCameraActive = true;
      })
      .catch((error) => {
        console.error("Error accessing the camera", error);
      });
  }

  captureImage() {
    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;
  
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
  
    if (context) {
      context.drawImage(video, 0, 0);
  
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `photo-${this.photos.length}.png`);
          this.photos.push(file);
          this.countPhotos++
          // Chama o serviço com o array de fotos
          if(this.photos.length === 3){
            console.log("CHAMAR API")
            this.faceRecognitionService.save_photos(this.photos).subscribe(
              response => {
                console.log('Faces detected:', response);
                this.photos = [];
              },
              error => {
                console.error('ERROR COMPONENT:', error);
              }
            );
          }
          
        } else {
          console.error('Failed to create blob from canvas');
        }
      }, 'image/png');
    } else {
      console.error('Failed to get canvas context');
    }
  }

  captureImage2() {
    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;
  
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
  
    if (context) {
      context.drawImage(video, 0, 0);
  
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `photo-${this.photos.length}.png`);
          this.photos.push(file);
          this.countPhotos = this.countPhotos + 1;
          this.cdr.detectChanges(); // Força a atualização da UI

          // Chama a API apenas se o array tiver exatamente 3 fotos
          if (this.photos.length === 3) {
            console.log("CHAMAR API");
            this.faceRecognitionService.save_photos(this.photos).subscribe(
              response => {
                console.log('RESPONSE_SUCCESS:', response);
                this.photos = [];
                this.stopCamera();
                this.router.navigate(['/profile']);
                this.openModalWithComponent('Fotos salvas com sucesso.', 'Você já pode utilizar o serviço de Ponto Eletrônico');
              },
              error => {
                console.error('RESPONSE_ERROR:', error);
              }
            );
          }

        } else {
          console.error('Failed to create blob from canvas');
        }
      }, 'image/png');
    } else {
      console.error('Failed to get canvas context');
    }
  }
  
  openModalWithComponent(title: string, text: string) {
    const initialState: ModalOptions = {
      initialState: {
        title: title,
        text: text
      }
    };
    this.modalRef = this.modalService.show(ModalRegisterComponent, initialState);
    this.modalRef.content.closeBtnName = 'Close';
  }

  testingMethod() {
    this.faceRecognitionService.testing().subscribe(response => {
      console.log('Faces detected:', response);
    });
  };

  stopCamera() {
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    this.isCameraActive = false;
  }



}
