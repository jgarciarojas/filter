import { NgModule } from '@angular/core';
import { CoreHttpParams } from './http';
import { RelationsModel } from './relationships';

@NgModule({
  declarations: [],
  providers: [
    CoreHttpParams,
    RelationsModel
  ],
  imports: [
  ],
  exports: [
  ]
})
export class CoreModule {
}
