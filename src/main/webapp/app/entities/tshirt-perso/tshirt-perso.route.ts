import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TshirtPerso } from 'app/shared/model/tshirt-perso.model';
import { TshirtPersoService } from './tshirt-perso.service';
import { TshirtPersoComponent } from './tshirt-perso.component';
import { TshirtPersoDetailComponent } from './tshirt-perso-detail.component';
import { TshirtPersoUpdateComponent } from './tshirt-perso-update.component';
import { TshirtPersoDeletePopupComponent } from './tshirt-perso-delete-dialog.component';
import { ITshirtPerso } from 'app/shared/model/tshirt-perso.model';

@Injectable({ providedIn: 'root' })
export class TshirtPersoResolve implements Resolve<ITshirtPerso> {
  constructor(private service: TshirtPersoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITshirtPerso> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TshirtPerso>) => response.ok),
        map((tshirtPerso: HttpResponse<TshirtPerso>) => tshirtPerso.body)
      );
    }
    return of(new TshirtPerso());
  }
}

export const tshirtPersoRoute: Routes = [
  {
    path: '',
    component: TshirtPersoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TshirtPersos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TshirtPersoDetailComponent,
    resolve: {
      tshirtPerso: TshirtPersoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TshirtPersos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TshirtPersoUpdateComponent,
    resolve: {
      tshirtPerso: TshirtPersoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TshirtPersos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TshirtPersoUpdateComponent,
    resolve: {
      tshirtPerso: TshirtPersoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TshirtPersos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tshirtPersoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TshirtPersoDeletePopupComponent,
    resolve: {
      tshirtPerso: TshirtPersoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TshirtPersos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
