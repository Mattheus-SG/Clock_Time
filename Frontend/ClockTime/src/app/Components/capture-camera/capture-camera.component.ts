import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FaceDetectService } from '../../Services/FaceDetectService/face-detect.service';
import { MenuMobileBackComponent } from '../shared/menu-mobile-back/menu-mobile-back.component';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalRegisterComponent } from '../Modals/modal-register/modal-register.component';
import { AppointmentService } from '../../Services/AppointmentService/appointment.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-camera-capture',
  templateUrl: './capture-camera.component.html',
  styleUrls: ['./capture-camera.component.scss'],
  standalone : true,
  imports : [
    NgIf,
    MenuMobileBackComponent,
    ModalRegisterComponent
  ]
})
export class CameraCaptureComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  @Input() typeAppointment: string = '';

  isCameraActive = false;
  modalRef?: BsModalRef;

  private latitude!: number;
  private longitude!: number;

  constructor(
    private faceRecognitionService: FaceDetectService, 
    private router : Router, 
    private modalService : BsModalService,
    private appointmentService : AppointmentService,) { }
    locationError = false;

    ngOnInit(){
      this.locationError = false;
      this.getLocation();
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

  getLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("LOCATION: ", position);
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            resolve(position.coords)
          },
          (error) => {
            reject(error);
            this.locationError = true;
            console.log("ERROR_LOCATION: ", this.locationError);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

  captureImage() {

    switch (this.typeAppointment) {
      case "ENTRY":
        this.call_set_entry();
        break;
  
      case "OUTWORK":
        this.call_set_outwork();
        break;
  
      // Adicione mais casos se necessário
      default:
        console.log("Tipo de compromisso desconhecido");
        break;
    }

  }

  call_set_entry(){
    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;
  
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0);
  
    canvas.toBlob((blob) => {
      if (blob) {
        this.faceRecognitionService.detectFaces(new File([blob], 'captured-image.png')).subscribe(response => {
          console.log('RESPONSE_SUCCESS:', response);
          this.stopCamera();
          this.set_entry().then(success => {
            if (success) {
              this.openModalWithComponent("Ponto Gravado", `Similaridade: ${response.porcentagem_de_match.toFixed(2)}%`);
              this.router.navigate(['/profile']);
            } else {
              console.log('Falha ao gravar ponto.');
            }
          });
  
        }, error => {
          console.log("ERROR RESPONDE_CAPTURE_CAMERA: ", error);
          this.openModalWithComponent("Erro", error.error || "Não foi possível reconhecer a face.");
        });
      }
    });
  }

  call_set_outwork(){
    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;
  
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0);
  
    canvas.toBlob((blob) => {
      if (blob) {
        this.faceRecognitionService.detectFaces(new File([blob], 'captured-image.png')).subscribe(response => {
          console.log('RESPONSE_SUCCESS:', response);
          this.stopCamera();

          // TROCAR
          this.set_outwork().then(success => {
            if (success) {
              this.openModalWithComponent("Ponto Gravado", `Similaridade: ${response.porcentagem_de_match.toFixed(2)}%`);
              this.router.navigate(['/profile']);
            } else {
              console.log('Falha ao gravar ponto.');
            }
          });

  
        }, error => {
          console.log("ERROR RESPONDE_CAPTURE_CAMERA: ", error);
          this.openModalWithComponent("Erro", error.error || "Não foi possível reconhecer a face.");
        });
      }
    });
  }
  
  set_entry(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.appointmentService.set_entry_time(this.latitude, this.longitude).subscribe(
        (response) => {
          console.log("RESPONSE SET_ENTRY: ", response);
          resolve(true);
        },
        (httpError: HttpErrorResponse) => {
          console.log("ERROR SET_ENTRY:", httpError.error);
          this.openModalWithComponent("Erro", httpError.error || "Erro desconhecido ao gravar o ponto.");
          reject(false);
        }
      );
    });
  }

  set_outwork(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.appointmentService.set_outwork_time(this.latitude, this.longitude).subscribe(
        (response) => {
          console.log("RESPONSE SET_ENTRY: ", response);
          resolve(true);
        },
        (httpError: HttpErrorResponse) => {
          console.log("ERROR SET_ENTRY:", httpError.error);
          this.openModalWithComponent("Erro", httpError.error || "Erro desconhecido ao gravar o ponto.");
          reject(false);
        }
      );
    });
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
