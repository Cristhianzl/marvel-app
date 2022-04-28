import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MarvelService } from 'src/app/resources/marvel.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  public numberOfHeroes: number = 10;
  public heroesList: any = [];
  public loading: boolean = false;

  constructor(
    protected $marvelService: MarvelService,
    protected $router: Router
  ) { }

  ngOnInit(): void {

    this.getHeroes();

  }

  getHeroes() {

    //HTTP REQUEST PARA CHAMADAS SEQUENCIAIS USANDO RXJS

    this.loading = true;

    const res1$ = this.$marvelService.getHeroes(this.numberOfHeroes).pipe(
      catchError(error => of(error))
    );

    forkJoin([res1$]).subscribe((res: any) => {

      this.heroesList = res[0]['data']['results'];

      console.log("heroeslist", this.heroesList);
      this.loading = false;

    },
      (error) => {
        console.log("Ocorreu um erro ao buscar os heróis.", error);
        alert("Ocorreu um erro ao buscar os heróis. Favor entre em contato com o administrador.");
        this.loading = false;
      })



    //HTTP REQUEST PADRAO

    // this.$marvelService.getHeroes(this.numberOfHeroes).subscribe((res: any) => {
    //   this.heroesList = res['data']['results'];

    //   console.log("heroeslist", this.heroesList);
    //   this.loading = false;
    // },
    //   (error) => {
    //     console.log("Ocorreu um erro ao buscar os heróis.", error);
    //     alert("Ocorreu um erro ao buscar os heróis. Favor entre em contato com o administrador.")
    //     this.loading = false;
    //   })
  }

  getHeroId($event: number) {

    let idBase64 = btoa($event.toString());

    this.$router.navigate(['heroes/details'], {
      queryParams: {
        hero_id: idBase64
      }
    });
  }

}
