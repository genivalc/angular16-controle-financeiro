import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';

import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListComponent } from './components/list/list.component';


@NgModule({
  declarations: [
    ListComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CategoriasModule { }
