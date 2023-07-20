import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../service/categorias.service';
import { Router } from '@angular/router';
import { Categoria } from '../models/categoria.models';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  categoria!: Categoria;
  id: string = '';
  formCategoria!: FormGroup;
  rota: string = '';
  isNewForm: boolean = false;

  constructor(
    private categoriaService: CategoriasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.url[0].path;
    this.criarFormualario();

    if (this.rota === 'editar') {
      this.id = this.activatedRoute.snapshot.url[1].path;

    this.buscarCategoriaPeloId()
    }else{
      this.isNewForm = true
    }


  }

  buscarCategoriaPeloId(){
    this.categoriaService
    .getCategoriaId(parseInt(this.id))
    .subscribe((categoria: Categoria) => {
      this.categoria = categoria;
      this.formCategoria.controls['nome'].setValue(categoria.nome);
      this.formCategoria.controls['descricao'].setValue(categoria.descricao);
    });
  }

  criarFormualario() {
    this.formCategoria = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  salvarCategoria() {
    if (this.formCategoria.touched && this.formCategoria.dirty) {
      // const data = Object.assign('', this.formCategoria.getRawValue());
      let payload: Categoria = {

        nome: this.formCategoria.controls['nome'].value,
        descricao: this.formCategoria.controls['descricao'].value,
      };

      if(this.isNewForm) {
        this.criarCategoria(payload)
      }else{
        payload = { id: this.categoria.id, ...payload, }
        this.editarCategoria(payload)
      }

    }


  }

  editarCategoria(payload: Categoria){
    this.categoriaService.putCategoria(payload).subscribe(reposta => {
      this.router.navigate(['categorias'])
    })
  }

  criarCategoria(payload: Categoria){
    this.categoriaService.postCategoria(payload).subscribe(reposta => {
      this.router.navigate(['categorias'])
    })
  }
}
