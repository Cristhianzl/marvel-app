import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";



@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(private $http: HttpClient) { }

  public getHeroes(limit: number) {
    return this.$http.get(`${environment.api.baseUrl}/v1/public/characters?limit=${limit}&apikey=${environment.api.apikey}`);
  }

  public getHeroDetail(id: number) {
    return this.$http.get(`${environment.api.baseUrl}/v1/public/characters/${id}?apikey=${environment.api.apikey}`);
  }

  public getHeroesByName(name: string) {
    return this.$http.get(`${environment.api.baseUrl}/v1/public/characters?name=${name}&apikey=${environment.api.apikey}`);
  }

}
