import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonButton, IonList, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-order-filter-modal',
  templateUrl: './order-filter-modal.component.html',
  styleUrls: ['./order-filter-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonList, IonContent],
})
export class OrderFilterModalComponent {
  constructor(private modalController: ModalController) {}

  selectOrder(order: string) {
    this.modalController.dismiss(order);
  }

  clearFilter() {
    this.modalController.dismiss('number-asc');
  }
}