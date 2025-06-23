import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    PokemonCardComponent
  ]
})
export class FavoritesPage {
  favoritePokemons: any[] = [];

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  async loadFavorites() {
    const pokemons = await this.pokemonService.getFavoritePokemonDetails();
    
    this.favoritePokemons = pokemons.map(pokemon => ({
      ...pokemon,
      simpleTypes: pokemon.types.map((t: any) => t.type.name)
    }));
  }

  isFavorite(name: string): boolean {
    return this.pokemonService.isFavoriteByName(name);
  }

  toggleFavorite(name: string) {
    this.pokemonService.toggleFavoriteByName(name);
    this.loadFavorites();
  }

  goToDetail(name: string) {
    this.router.navigate([`tab-bar/pokemon`, name]);
  }
}