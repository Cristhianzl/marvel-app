import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
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


  public getHeroDetailRx(id: number) {
    return this.$http.get<any>(`${environment.api.baseUrl}/v1/public/characters/${id}?apikey=${environment.api.apikey}`).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  public getHeroesByName(name: string) {
    return this.$http.get(`${environment.api.baseUrl}/v1/public/characters?name=${name}&apikey=${environment.api.apikey}`);
  }


  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
