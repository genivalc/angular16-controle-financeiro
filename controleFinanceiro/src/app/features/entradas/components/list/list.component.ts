import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Entrada } from '../../models/entradas.model';
import { MatPaginator } from '@angular/material/paginator';
import { EntradasService } from '../../service/entradas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'nome',
    'pago',
    'data',
    'valor',
    'tipo',
    'editar',
    'excluir',
  ];
  dataSource = new MatTableDataSource<Entrada>();
  entradas: Entrada[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private entradasService: EntradasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarEntradas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  buscarEntradas() {
    this.entradasService.getEntradas().subscribe((entradas: Entrada[]) => {
      (this.entradas = entradas), (this.dataSource.data = this.entradas);
    });
  }

  edit(entrada: Entrada) {
    this.router.navigate(['entradas', 'editar', entrada.id]);
  }

  excluir(id: number) {
    this.entradasService.deleteEntradas(id).subscribe((reposta) => {
      this.buscarEntradas();
    });
  }

  novaEntrada() {
    this.router.navigate(['entradas', 'novo']);
  }
}
