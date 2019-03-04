import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

/* 3rd party libraries */
@NgModule({
  imports: [

    // angular
    CommonModule,
    HttpClientModule,

    // own
  ],
  declarations: [
  ],
  providers: [
  ],
})
export class CoreModule {
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
