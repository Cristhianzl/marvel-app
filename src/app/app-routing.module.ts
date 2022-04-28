import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './nav/home/home.component';
import { NotFoundComponent } from './nav/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { headerTitle: 'Início' }
  },

  {
    path: 'heroes',
    loadChildren:
      () => import('src/app/pages/heroes/heroes.module').then(m => m.HeroesModule)
  },


  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
