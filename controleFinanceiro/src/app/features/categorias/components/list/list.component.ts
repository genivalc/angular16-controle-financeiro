import { CategoriasService } from './../../service/categorias.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Categoria } from '../models/categoria.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nome', 'descricao', 'editar', 'excluir'];
  dataSource = new MatTableDataSource<Categoria>();
  categorias: Categoria[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoriaService: CategoriasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarCategorias();
  }

  buscarCategorias() {
    this.categoriaService
      .getCategoria()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
        this.dataSource.data = this.categorias;
      });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  edit(categoria: Categoria) {
    this.router.navigate(['categorias', 'editar', categoria.id]);
  }

  excluir(id: number) {
    this.categoriaService.deleteCategoria(id).subscribe((reposta) => {
      this.buscarCategorias();
    });
  }

  novaCategoria() {
    this.router.navigate(['categorias', 'nova-categoria']);
  }
}
