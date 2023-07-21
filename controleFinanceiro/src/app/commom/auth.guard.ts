import { AuthenticationService } from './auth/service/authentication.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateFn,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const url = state.url;
    return this.authenticationService.usuarioEstaLogado().pipe(
      tap((estaLogado) => {
        if (!estaLogado) {
          this.router.navigateByUrl('/auth/login');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
