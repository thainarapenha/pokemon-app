import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class PokemonCardComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() types!: string[];
  @Input() imageUrl!: string;

  get formattedId(): string {
    const idStr = (this.id ?? 0).toString().padStart(3, '0');
    return `Nº${idStr}`;
  }

  get mainType(): string {
    return this.types && this.types.length > 0 ? this.types[0] : 'normal';
  }

  mainTypeColor(type: string, variant: 'light' | 'dark' = 'dark'): string {
  const colors: any = {
      grass: { light: '#EDF6EC', dark: '#48D0B0' },
      poison: { light: '#F5EDF8', dark: '#A040A0' },
      fire: { light: '#FCF3EB', dark: '#FF6F61' }, 
      water: { light: '#EBF1F8', dark: '#6890F0' },
      bug: { light: '#F1F6E8', dark: '#A8B820' },
      normal: { light: '#F1F2F3', dark: '#A8A878' },
      electric: { light: '#FBF8E9', dark: '#F8D030' },
      ground: { light: '#F9EFEA', dark: '#E0C068' },
      fairy: { light: '#FBF1FA', dark: '#EE99AC' },
      fighting: { light: '#F8E9EE', dark: '#C03028' },
      psychic: { light: '#FCEEEF', dark: '#F85888' },
      rock: { light: '#F7F5F1', dark: '#B8A038' },
      ghost: { light: '#EBEDF4', dark: '#705898' },
      ice: { light: '#F1FBF9', dark: '#98D8D8' },
      dragon: { light: '#E4EEF6', dark: '#7038F8' },
      dark: { light: '#ECEBED', dark: '#705848' },
      steel: { light: '#ECF1F3', dark: '#B8B8D0' },
      flying: { light: '#F1F4FA', dark: '#A890F0' },
    };
    const tipo = type?.toLowerCase();
    return colors[tipo]?.[variant] || '#f8f8f8';
  }
}
