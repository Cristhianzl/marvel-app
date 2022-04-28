import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MarvelService } from 'src/app/resources/marvel.service';

@Component({
  selector: 'app-heroes-search',
  templateUrl: './heroes-search.component.html',
  styleUrls: ['./heroes-search.component.scss']
})
export class HeroesSearchComponent implements OnInit {

  public form!: FormGroup;
  public loading: boolean = false;

  public heroList: any = [];

  public findHero: boolean = false;

  public messageEmpty: string = "Busque seu Herói!";


  constructor(
    protected formBuilder: FormBuilder,
    protected $marvelService: MarvelService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      hero_name: new FormControl(''),
      hero_id: new FormControl(''),
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {

    this.loading = true;
    this.heroList = [];
    this.findHero = true;

    let data = this.form.getRawValue();

    if (data.hero_name == '' && data.hero_id == '') {
      window.alert("Por favor, digite algum dado para realizar a busca!");
      this.loading = false;
      return;
    }

    if (data.hero_name != '') {
      this.$marvelService.getHeroesByName(data.hero_name).subscribe((res: any) => {

        if (res['data']['results'][0]) {
          this.heroList.push(res['data']['results'][0]);
        }

        else {
          this.messageEmpty = "Não encontramos seu Herói!";
        }

        this.loading = false;

      },
        (error) => {
          if (error.error.status.includes("couldn't find")) {
            this.heroList = [];
            this.messageEmpty = "Não encontramos seu Herói!";
          }
          else {
            alert("Ocorreu um erro ao buscar o detalhe do herói. Favor entre em contato com o administrador.")
          }
          this.loading = false;
        });
    }

    if (data.hero_id != '') {
      this.$marvelService.getHeroDetail(data.hero_id).subscribe((res: any) => {

        if (res['data']['results'][0]) {
          this.heroList.push(res['data']['results'][0]);
        }

        else {
          this.messageEmpty = "Não encontramos seu Herói!";
        }

        this.loading = false;

      },
        (error) => {
          console.log("Ocorreu um erro ao buscar o detalhe do herói.", error);
          if (error.error.status.includes("couldn't find")) {
            this.heroList = [];
            this.messageEmpty = "Não encontramos seu Herói!";
          }
          else {
            alert("Ocorreu um erro ao buscar o detalhe do herói. Favor entre em contato com o administrador.")
          }
          this.loading = false;
        });
    }
  }


}
