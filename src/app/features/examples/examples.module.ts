import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { PrettyCodeModule } from '@eriice/pretty-code';

import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples.component';

@NgModule({
  imports: [
    SharedModule,
    PrettyCodeModule,
    ExamplesRoutingModule,
  ],
  declarations: [ExamplesComponent]
})
export class ExamplesModule { }
