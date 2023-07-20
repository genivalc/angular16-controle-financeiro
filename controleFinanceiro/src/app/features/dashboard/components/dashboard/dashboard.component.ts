import { Entrada } from './models/entrada.models';
import { DashboardService } from './../../service/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  receita = 0;
  despesa = 0;
  saldo = 0;

  meses = [
    { value: 0, viewValue: 'Janeiro' },
    { value: 1, viewValue: 'Fevereiro' },
    { value: 2, viewValue: 'Março' },
    { value: 3, viewValue: 'Abril' },
    { value: 4, viewValue: 'Maio' },
    { value: 5, viewValue: 'Junho' },
    { value: 6, viewValue: 'Julho' },
    { value: 7, viewValue: 'Agosto' },
    { value: 8, viewValue: 'Setembro' },
    { value: 9, viewValue: 'Outubro' },
    { value: 10, viewValue: 'Novembro' },
    { value: 11, viewValue: 'Dezembro' },
  ];

  formDashboard!: FormGroup;

  entrada: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  getEntrada() {
    this.receita = 0;
    this.despesa = 0;
    this.saldo = 0;
    this.entrada = [];

    const payload = {
      mes: this.formDashboard.controls['mes'].value +1,
      ano: this.formDashboard.controls['ano'].value,
    };
    this.dashboardService.getEntradas(payload).subscribe((entradas) => {
      this.entrada = entradas;
      this.getReceita();
      this.getDespesas();
      this.getSaldo();
    });
  }

  criarFormulario() {
    this.formDashboard = this.formBuilder.group({
      mes: ['', Validators.required],
      ano: ['', Validators.required],
    });
  }

  getReceita() {
    this.entrada.forEach((entrada) => {
      if (entrada.tipo === 'receita') {
        this.receita += parseInt(entrada.valor);
      }
    });
  }

  getDespesas() {
    this.entrada.forEach((entrada) => {
      if (entrada.tipo === 'despesa') {
        this.despesa += parseInt(entrada.valor);
      }
    });
  }

  getSaldo() {
    this.saldo = this.receita - this.despesa;
  }
}
