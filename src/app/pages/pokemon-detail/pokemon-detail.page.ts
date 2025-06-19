import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/http.service';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonBadge,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonBadge,
    IonCard,
    IonCardContent
  ]
})
export class PokemonDetailPage implements OnInit {
  
  pokemonName!: string;
  pokemon: any;
  evolutions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
  ) {}

  ngOnInit() {
    this.pokemonName = this.route.snapshot.paramMap.get('name')!;
    this.loadPokemon();
  }

  extractFlavorText(species: any): string {
    const entry = species.flavor_text_entries.find((e: any) => e.language.name === 'pt');
    return entry ? entry.flavor_text.replace(/\f/g, ' ') : 'Descrição não disponível.';
  }

  extractCategory(species: any): string {
    const entry = species.genera.find((g: any) => g.language.name === 'pt');
    return entry ? entry.genus : 'Categoria desconhecida';
  }

  getGenderText(rate: number): string {
    if (rate === -1) {
      return 'Sem gênero';
    }

    const female = (rate / 8) * 100;
    const male = 100 - female;

    return `♂ ${male.toFixed(0)}% / ♀ ${female.toFixed(0)}%`;
  }

  loadPokemon() {
    this.pokemonService.getPokemonName(this.pokemonName).subscribe(pokemonData => {
      this.pokemonService.getPokemonSpecies(pokemonData.id).subscribe(species => {
        this.pokemon = {
          id: pokemonData.id,
          name: pokemonData.name,
          types: pokemonData.types.map((t: any) => t.type.name),
          height: pokemonData.height,
          weight: pokemonData.weight,
          abilities: pokemonData.abilities,
          image: pokemonData.sprites.other['official-artwork'].front_default,
          description: this.extractFlavorText(species),
          category: this.extractCategory(species),
          genderRate: (species as any).gender_rate
        };
      });
    });
  }

  get mainType(): string {
    return this.pokemon?.types?.[0] || 'normal';
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

  getTypeIconUrl(type: string): string {
    return `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type.toLowerCase()}.svg`;
  }
}