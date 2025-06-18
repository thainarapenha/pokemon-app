import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type-filter-modal',
  standalone: true,
  templateUrl: './type-filter-modal.component.html',
  styleUrls: ['./type-filter-modal.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class TypeFilterModalComponent {
  @Input() types: string[] = [];

  constructor(private modalCtrl: ModalController) {}

  selectType(type: string) {
    this.modalCtrl.dismiss(type);
  }

  clearFilter() {
    this.modalCtrl.dismiss(null);
  }
}