import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'controleFinanceiro';

  menus : any [] = [
    {descricao: 'Dashboard', rota: 'dashboard'},
    {descricao: 'Categorias', rota: 'categorias'},
    {descricao: 'Entradas', rota: 'entradas'}
  ]
}
