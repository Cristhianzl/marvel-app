import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesDetailsComponent } from './heroes-details/heroes-details.component';
import { HeroesComponent } from './heroes/heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroesCardComponent } from './heroes/heroes-card/heroes-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeroesSearchComponent } from './heroes-search/heroes-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: HeroesComponent, data: { headerTitle: 'Lista de Heróis' } },
  { path: 'details', component: HeroesDetailsComponent, data: { headerTitle: 'Detalhe do Herói' } },
  { path: 'search', component: HeroesSearchComponent, data: { headerTitle: 'Buscar Herói' } },
];

@NgModule({
  declarations: [
    HeroesComponent,
    HeroesDetailsComponent,
    HeroesCardComponent,
    HeroesSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HeroesModule { }
