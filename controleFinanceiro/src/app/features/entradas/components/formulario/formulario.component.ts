import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/features/categorias/components/models/categoria.models';
import { CategoriasService } from 'src/app/features/categorias/service/categorias.service';
import { EntradasService } from '../../service/entradas.service';
import * as dayjs from 'dayjs';
import { Entrada } from '../../models/entradas.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  tiposDeEntradas = ['receita', 'despesa'];

  statusDePagamento = [
    { value: true, descricao: 'Pago' },
    { value: false, descricao: 'Pendente' },
  ];

  categorias: Categoria[] = [];
  formEntradas!: FormGroup;
  rota: string = '';
  id: string = '';
  isNewForm: boolean = false;
  entrada!: Entrada;

  categorias$ =  this.categoriaService.getCategoria()

  constructor(
    private readonly categoriaService: CategoriasService,
    private readonly entradasService: EntradasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private FormBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.url[0].path;
    this.criarFormulario();


    if (this.rota === 'editar') {
      this.id = this.activatedRoute.snapshot.url[1].path;

      this.buscarEntradasPeloId();
    } else {
      this.isNewForm = true;
    }
  }

  buscarEntradasPeloId() {
    this.entradasService
      .getEntradasId(+this.id)
      .subscribe((entrada: Entrada) => {
        this.entrada = entrada;

        const data = this.entrada.data.split('-');

        this.formEntradas.controls['nome'].setValue(this.entrada.nome);
        this.formEntradas.controls['valor'].setValue(this.entrada.valor);
        this.formEntradas.controls['categoriaId'].setValue(
          this.entrada.categoriaId
        );
        this.formEntradas.controls['pago'].setValue(this.entrada.pago);
        this.formEntradas.controls['tipo'].setValue(this.entrada.tipo);
        this.formEntradas.controls['data'].setValue(
          new Date(+data[2], +data[1] -1, +data[0])
        );
      });
  }



  criarFormulario() {
    this.formEntradas = this.FormBuilder.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      categoriaId: ['', Validators.required],
      pago: [true, Validators.required],
      tipo: ['Despesa', Validators.required],
      data: [new Date(), Validators.required],
    });
  }

  submit() {
    const data = dayjs(this.formEntradas.controls['data'].value).format(
      'DD/MM/YYYY'
    );

    const payloadRequest: Entrada = Object.assign(
      '',
      this.formEntradas.getRawValue()
    );
    payloadRequest.data = data;

    const payload: Entrada = {
      nome: payloadRequest.nome,
      categoriaId: payloadRequest.categoriaId,
      data: payloadRequest.data,
      pago: payloadRequest.pago,
      tipo: payloadRequest.tipo,
      valor: payloadRequest.valor,
    };
    if (this.isNewForm) {
      this.criarNovaEntrada(payload)
    }else{
      payload.id = this.entrada.id
      this.editarNovaEntrada(payload)
    }
  }

  criarNovaEntrada(payload: Entrada) {
    this.entradasService.postEntradas(payload).subscribe((resposta) => {
      this.redirect()
    });
  }

  editarNovaEntrada(payload: Entrada) {
    this.entradasService.putEntradas(payload).subscribe((resposta) => {
      this.redirect()
    });
  }

  redirect(){
    this.router.navigate(['entradas'])
  }
}
