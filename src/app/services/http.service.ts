import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private apiURL = 'https://pokeapi.co/api/v2/';
  private favoritesKey = 'favoritePokemons';

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<{ results: any }> {
    return this.http.get<{ results: any }>(`${this.apiURL}pokemon/`);
  }

  getPokemonName(name: string): Observable<any> {
    return this.http.get(`${this.apiURL}pokemon/${name}`);
  }

  getPokemonSpecies(name: string) {
    return this.http.get(`${this.apiURL}pokemon-species/${name}`);
  }

  getEvolutionChainByUrl(url: string) {
    return this.http.get(url);
  }

  getFavoritePokemons(): string[] {
    const stored = localStorage.getItem(this.favoritesKey);
    return stored ? JSON.parse(stored) : [];
  }

  async getFavoritePokemonDetails(): Promise<any[]> {
    const names = this.getFavoritePokemons();
    const requests = names.map(name =>
      firstValueFrom(this.getPokemonName(name))
    );
    return Promise.all(requests);
  }

  addFavorite(pokemonName: string): void {
    const favorites = this.getFavoritePokemons();
    if (!favorites.includes(pokemonName)) {
      favorites.push(pokemonName);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(pokemonName: string): void {
    const favorites = this.getFavoritePokemons().filter(name => name !== pokemonName);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  isFavoriteByName(name: string): boolean {
    const favorites = this.getFavoritePokemons();
    return favorites.includes(name);
  }

  toggleFavoriteByName(name: string): void {
    const favorites = this.getFavoritePokemons();
    const index = favorites.indexOf(name);

    if (index >= 0) {
      favorites.splice(index, 1);
    } else {
      favorites.push(name);
    }

    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }
}