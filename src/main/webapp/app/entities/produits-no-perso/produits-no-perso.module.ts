import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrintedSharedModule } from 'app/shared/shared.module';
import { ProduitsNoPersoComponent } from './produits-no-perso.component';
import { ProduitsNoPersoDetailComponent } from './produits-no-perso-detail.component';
import { ProduitsNoPersoUpdateComponent } from './produits-no-perso-update.component';
import { ProduitsNoPersoDeletePopupComponent, ProduitsNoPersoDeleteDialogComponent } from './produits-no-perso-delete-dialog.component';
import { produitsNoPersoRoute, produitsNoPersoPopupRoute } from './produits-no-perso.route';

const ENTITY_STATES = [...produitsNoPersoRoute, ...produitsNoPersoPopupRoute];

@NgModule({
  imports: [PrintedSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProduitsNoPersoComponent,
    ProduitsNoPersoDetailComponent,
    ProduitsNoPersoUpdateComponent,
    ProduitsNoPersoDeleteDialogComponent,
    ProduitsNoPersoDeletePopupComponent
  ],
  entryComponents: [ProduitsNoPersoDeleteDialogComponent]
})
export class PrintedProduitsNoPersoModule {}
