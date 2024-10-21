import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-all-appointments',
  standalone: true,
  imports: [ NgIf, NgFor ],
  templateUrl: './modal-all-appointments.component.html',
  template: `
<div *ngIf="data.length < 1" *ngFor="let item of data">
    <div class="modal-header">
        <h4 class="modal-title pull-left">{{ title }}</h4>
        <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="close()">
            <span aria-hidden="true" class="visually-hidden">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <strong>Data: </strong>{{ item.date }}
    </div>
    <div class="modal-body">
        <strong>Horário de Entrada: </strong>{{ item.entryTime }}
    </div>
    <div class="modal-body">
        <strong>Horário de Saída: </strong>{{ item.outTime }}
    </div>
    <div *ngIf="!data.streetEntryTime; then thenBlockEntry else elseBlockEntry"></div>
    <ng-template #thenBlockEntry>
        <div class="modal-body"><strong>Localização da Entrada: </strong>Sem Dados</div>
    </ng-template>
    <ng-template #elseBlockEntry>
        <div class="modal-body"><strong>Localização da Entrada: </strong>{{ item.streetEntryTime }}</div>
    </ng-template>
    
    <div *ngIf="!data.streetExitTime; then thenBlock else elseBlock"></div>
    <ng-template #thenBlock>
        <div class="modal-body"><strong>Localização da Saída: </strong>Sem Dados</div>
    </ng-template>
    <ng-template #elseBlock>
        <div class="modal-body"><strong>Localização da Saída: </strong>{{ data.streetExitTime }}</div>
    </ng-template>
    
    <hr>
</div>

<div>
    <div class="modal-header">
        <h4 class="modal-title pull-left">ERROR</h4>
        <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="close()">
            <span aria-hidden="true" class="visually-hidden">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <p>Sem dados a exibir</p>
    </div>
</div>
  `
})
export class ModalAllAppointmentsComponent {

  public title? : string;
  public text? : string;
  public data? : any;

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(){
    console.log("MODAL: ", this.data)
  }

  close() {
    this.bsModalRef.hide();
  }

}
