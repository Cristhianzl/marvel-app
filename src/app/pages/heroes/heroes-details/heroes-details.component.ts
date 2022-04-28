import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from 'src/app/resources/marvel.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-heroes-details',
  templateUrl: './heroes-details.component.html',
  styleUrls: ['./heroes-details.component.scss']
})
export class HeroesDetailsComponent implements OnInit {

  public heroId: number = 0;
  public loading: boolean = false;
  public heroProfile: any = {};

  constructor(
    protected $route: ActivatedRoute,
    protected $marvelService: MarvelService
  ) {

    this.$route.queryParams.subscribe(
      params => {
        if (params['hero_id']) {
          const heroIdBase64 = atob(params['hero_id']);
          this.heroId = Number(heroIdBase64);
        }
      });

  }

  ngOnInit(): void {

    this.getHeroDetail();

  }

  getHeroDetail() {
    this.loading = true;

    this.$marvelService.getHeroDetail(this.heroId).subscribe((hero: any) => {
      this.heroProfile = hero['data']['results'][0];
      console.log("heroProfile", this.heroProfile)
      this.loading = false;

    },
      (error) => {
        console.log("Ocorreu um erro ao buscar o detalhe do herói.", error);
        alert("Ocorreu um erro ao buscar o detalhe do herói. Favor entre em contato com o administrador.")
        this.loading = false;
      });

  }

}
