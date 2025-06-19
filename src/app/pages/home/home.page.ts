import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/http.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { TypeFilterModalComponent } from '../../components/type-filter-modal/type-filter-modal.component';
import { OrderFilterModalComponent } from '../../components/order-filter-modal/order-filter-modal.component';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButton
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

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
    IonButton
  ],
})

export class HomePage implements OnInit {
  
  pokemonTypes: string[] = [
    'fire', 'water', 'grass', 'electric', 'psychic',
    'rock', 'ground', 'bug', 'flying', 'poison'
  ];

  public pokemons: any[] = [];
  public filteredPokemons: any[] = [];

  currentOrder: string = 'id-asc';
  
  constructor(
    private httpService: PokemonService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllPokemons();
  }

  goToDetail(pokemonId: number) {
    this.router.navigate([`/pokemon`, pokemonId]);
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
  
  async openTypeFilterModal() {
    const modal = await this.modalController.create({
      component: TypeFilterModalComponent,
      componentProps: {
        types: this.pokemonTypes
      },
      breakpoints: [0, 0.5, 0.75, 0.8, 1],
      initialBreakpoint: 0.8,
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

  async openOrderFilterModal() {
    const modal = await this.modalController.create({
      component: OrderFilterModalComponent,
      breakpoints: [0, 0.5, 0.75, 0.8, 1],
      initialBreakpoint: 0.5,
      handle: true,
      backdropDismiss: true,
      showBackdrop: true
    });

    await modal.present();

    const { data: selectedOrder } = await modal.onDidDismiss();

    if (selectedOrder) {
      this.applyOrderFilter(selectedOrder);
    }
  }

  applyOrderFilter(order: string) {
    switch (order) {
      case 'number-asc':
        this.filteredPokemons.sort((a, b) => a.id - b.id);
        break;
      case 'number-desc':
        this.filteredPokemons.sort((a, b) => b.id - a.id);
        break;
      case 'az':
        this.filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        this.filteredPokemons.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  }
}