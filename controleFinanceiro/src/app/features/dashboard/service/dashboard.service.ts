import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends HttpBaseService{

  endpoint = 'entradas';

  constructor(protected override injector: Injector) {
    super(injector);
   }

   getEntradas(): Observable<any>{
    return this.httpGet(this.endpoint)
   }
}
