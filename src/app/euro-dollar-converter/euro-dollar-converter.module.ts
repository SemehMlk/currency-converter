import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './components/converter/converter.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';
import { HistoryComponent } from './components/history/history.component';



@NgModule({
  declarations: [
    ConverterComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    ConverterComponent
  ]
})
export class EuroDollarConverterModule { }
