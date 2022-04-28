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

}
