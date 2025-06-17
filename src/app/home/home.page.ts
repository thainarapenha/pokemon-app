import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { PokemonService } from '../services/http.service';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PokemonCardComponent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel
  ],
})

export class HomePage implements OnInit {
  public pokemons: any[] = [];
  public filteredPokemons: any[] = [];
  
  constructor(private httpService: PokemonService) {}

  ngOnInit() {
    this.getAllPokemons();
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