import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { Categoria } from '../components/models/categoria.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService extends HttpBaseService{

  private endpoint = 'categorias';

  constructor(protected override injector: Injector) {
    super(injector);
   }

   getCategoria(): Observable<any>{
    return this.httpGet(this.endpoint)
   }

   getCategoriaId(id: number): Observable<any>{
    return this.httpGet(`${this.endpoint}/${id}`)
   }

   postCategoria(payload: Categoria): Observable<any>{
    return this.httpPost(`${this.endpoint}`,payload)
   }

   putCategoria(payload: Categoria): Observable<any>{
    return this.httpPut(`${this.endpoint}/${payload.id}`,payload)
   }

   deleteCategoria(id: number): Observable<any>{
    return this.httpDelete(`${this.endpoint}/${id}`)
   }
}
