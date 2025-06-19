import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private apiURL = 'https://pokeapi.co/api/v2/';

    constructor (private http: HttpClient) {}

    getAllPokemon(): Observable<{ results: any }> {
        return this.http.get<{ results: any }>(`${this.apiURL}pokemon/`);
    }

    getPokemonName(name: string): Observable<any> {
        return this.http.get(`${this.apiURL}pokemon/${name}`);
    }

    getPokemonSpecies(name: string) {
        return this.http.get(`${this.apiURL}pokemon-species/${name}`);
    }

}