import { NgModule } from '@angular/core';
import { MomentumComponent } from './momentum.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MomentumComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MomentumComponent
  ]
})
export class MomentumModule { }
