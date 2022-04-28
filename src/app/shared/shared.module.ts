import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';



@NgModule({
  declarations: [
    LoaderComponent,
    EmptyStateComponent
  ],
  exports: [
    LoaderComponent,
    EmptyStateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
