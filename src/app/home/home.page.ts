import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/http.service';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { TypeFilterModalComponent } from '../components/type-filter-modal/type-filter-modal.component';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonModal
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PokemonCardComponent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    IonModal,
    TypeFilterModalComponent
  ],
})

export class HomePage implements OnInit {
  
  pokemonTypes: string[] = [
    'fire', 'water', 'grass', 'electric', 'psychic',
    'rock', 'ground', 'bug', 'flying', 'poison'
  ];

  public pokemons: any[] = [];
  public filteredPokemons: any[] = [];
  
  constructor(
    private httpService: PokemonService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getAllPokemons();
  }

  async openTypeFilterModal() {
    const modal = await this.modalController.create({
      component: TypeFilterModalComponent,
      componentProps: {
        types: this.pokemonTypes
      },
      breakpoints: [0, 0.4, 0.6, 1],
      initialBreakpoint: 0.4,
      handle: true,
      showBackdrop: true,
      backdropDismiss: true
    });

    await modal.present();

    const { data: selectedType } = await modal.onDidDismiss();

    this.filteredPokemons = selectedType
      ? this.pokemons.filter(p => p.types.includes(selectedType))
      : this.pokemons;
  }

  getAllPokemons() {
    this.httpService.getAllPokemon().subscribe(async (response: any) => {
      const results = response.results;

      const promises = results.map((p: any) =>
        this.httpService.getPokemonName(p.name).toPromise()
      );

      const detailedPokemons = await Promise.all(promises);
      this.pokemons = detailedPokemons.map((pokemon: any) => ({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((t: any) => t.type.name),
        image: pokemon.sprites.other['official-artwork'].front_default
      }));
      this.filteredPokemons = this.pokemons;
    });
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();

    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query)
    );
  }
}