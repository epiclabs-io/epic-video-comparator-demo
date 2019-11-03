import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('app/features/comparator/comparator.module').then(m => m.ComparatorModule),
  },
  {
    path: 'examples',
    loadChildren: () => import('app/features/examples/examples.module').then(m => m.ExamplesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
