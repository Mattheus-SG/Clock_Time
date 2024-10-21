import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-info-appointment',
  standalone: true,
  imports: [ NgIf ],
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ title }}</h4>
      <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="close()">
        <span aria-hidden="true" class="visually-hidden">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <strong>Data: </strong>{{ data.date }}
    </div>
    <div class="modal-body">
      <strong>Horário de Entrada: </strong>{{ data.entryTime }}
    </div>
    <div class="modal-body">
      <strong>Horário de Saída: </strong>{{ data.outTime }}
    </div>
    <div *ngIf="!data.streetEntryTime; then thenBlockEntry else elseBlockEntry"></div>
      <ng-template #thenBlockEntry>
        <div class="modal-body"><strong>Localização da Entrada: </strong>Sem Dados</div>
      </ng-template>
      <ng-template #elseBlockEntry>
        <div class="modal-body"><strong>Localização da Entrada: </strong>{{ data.streetEntryTime }}</div>
      </ng-template>

    <div *ngIf="!data.streetExitTime; then thenBlock else elseBlock"></div>
      <ng-template #thenBlock>
        <div class="modal-body"><strong>Localização da Saída: </strong>Sem Dados</div>
      </ng-template>
      <ng-template #elseBlock>
        <div class="modal-body"><strong>Localização da Saída: </strong>{{ data.streetExitTime }}</div>
      </ng-template>
  `,
  styleUrl: './modal-info-appointment.component.scss'
})
export class ModalInfoAppointmentComponent {

  public title? : string;
  public text? : string;
  public data? : any;

  constructor(private bsModalRef: BsModalRef) { }

  close() {
    this.bsModalRef.hide();
  }

}
