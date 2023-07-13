import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {
  //apenas leitura
  public readonly httpClient!: HttpClient
  private apiBase = 'http://localhost:3000/';

  constructor(protected readonly injector: Injector) {
    //inversao de dependecia , cria um bloco de codigo para deixar a ultilizacao dinamica sem a necesidade de ser especifico o tipo (exemplo bloco de codigo dinamico para ultizar qualquer banco de dados)
    if(!injector) {
      throw new Error ('Not injector null')

    }
    this.httpClient = injector.get(HttpClient)

  }

  protected httpGet(endpoint: String): Observable<any> {
    return this.httpClient.get(`${this.apiBase}${endpoint}`)
  }

  protected httpPost(endpoint: String, dados: any): Observable<any> {
    return this.httpClient.post(`${this.apiBase}${endpoint}`, dados)
  }

  protected httpPut(endpoint: String, dados: any): Observable<any> {
    return this.httpClient.put(`${this.apiBase}${endpoint}`, dados)
  }

  protected httpDelete(endpoint: String): Observable<any> {
    return this.httpClient.delete(`${this.apiBase}${endpoint}`)
  }
}
