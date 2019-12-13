import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProduitsNoPerso } from 'app/shared/model/produits-no-perso.model';
import { ProduitsNoPersoService } from './produits-no-perso.service';
import { ProduitsNoPersoComponent } from './produits-no-perso.component';
import { ProduitsNoPersoDetailComponent } from './produits-no-perso-detail.component';
import { ProduitsNoPersoUpdateComponent } from './produits-no-perso-update.component';
import { ProduitsNoPersoDeletePopupComponent } from './produits-no-perso-delete-dialog.component';
import { IProduitsNoPerso } from 'app/shared/model/produits-no-perso.model';

@Injectable({ providedIn: 'root' })
export class ProduitsNoPersoResolve implements Resolve<IProduitsNoPerso> {
  constructor(private service: ProduitsNoPersoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduitsNoPerso> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProduitsNoPerso>) => response.ok),
        map((produitsNoPerso: HttpResponse<ProduitsNoPerso>) => produitsNoPerso.body)
      );
    }
    return of(new ProduitsNoPerso());
  }
}

export const produitsNoPersoRoute: Routes = [
  {
    path: '',
    component: ProduitsNoPersoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ProduitsNoPersos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProduitsNoPersoDetailComponent,
    resolve: {
      produitsNoPerso: ProduitsNoPersoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ProduitsNoPersos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProduitsNoPersoUpdateComponent,
    resolve: {
      produitsNoPerso: ProduitsNoPersoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ProduitsNoPersos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProduitsNoPersoUpdateComponent,
    resolve: {
      produitsNoPerso: ProduitsNoPersoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ProduitsNoPersos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const produitsNoPersoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProduitsNoPersoDeletePopupComponent,
    resolve: {
      produitsNoPerso: ProduitsNoPersoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ProduitsNoPersos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
