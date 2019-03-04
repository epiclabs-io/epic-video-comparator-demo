import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComparatorComponent } from './comparator.component';

const comparatorRoutes: Routes = [
  {
    path: '',
    component: ComparatorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(comparatorRoutes)],
  exports: [RouterModule]
})
export class ComparatorRoutingModule { }
