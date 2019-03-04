import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { PrettyCodeModule } from '@eriice/pretty-code';
import { ComparatorComponent } from './comparator.component';
import { ComparatorRoutingModule } from './comparator-routing.module';

@NgModule({
  imports: [
    SharedModule,
    PrettyCodeModule,
    ComparatorRoutingModule,
  ],
  declarations: [ComparatorComponent]
})
export class ComparatorModule { }
