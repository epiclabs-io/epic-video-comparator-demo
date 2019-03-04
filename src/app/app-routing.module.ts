import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/comparator',
    pathMatch: 'full'
  },
  {
    path: 'comparator',
    loadChildren: 'app/features/comparator/comparator.module#ComparatorModule',
  },
  {
    path: 'examples',
    loadChildren: 'app/features/examples/examples.module#ExamplesModule',
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
