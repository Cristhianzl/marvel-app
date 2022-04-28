import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    protected $marvelService: MarvelService
  ) { }

  ngOnInit(): void {

    this.getHeroes();

  }

  getHeroes() {

    this.loading = true;

    this.$marvelService.getHeroes(this.numberOfHeroes).subscribe((res: any) => {
      this.heroesList = res['data']['results'];

      console.log("heroeslist", this.heroesList);
      this.loading = false;
    },
      (error) => {
        console.log("Ocorreu um erro ao buscar os heróis.", error);
        alert("Ocorreu um erro ao buscar os heróis. Favor entre em contato com o administrador.")
        this.loading = false;
      })
  }

}
