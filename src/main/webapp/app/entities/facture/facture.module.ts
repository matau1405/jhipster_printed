import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrintedSharedModule } from 'app/shared/shared.module';
import { FactureComponent } from './facture.component';
import { FactureDetailComponent } from './facture-detail.component';
import { FactureUpdateComponent } from './facture-update.component';
import { FactureDeletePopupComponent, FactureDeleteDialogComponent } from './facture-delete-dialog.component';
import { factureRoute, facturePopupRoute } from './facture.route';

const ENTITY_STATES = [...factureRoute, ...facturePopupRoute];

@NgModule({
  imports: [PrintedSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FactureComponent,
    FactureDetailComponent,
    FactureUpdateComponent,
    FactureDeleteDialogComponent,
    FactureDeletePopupComponent
  ],
  entryComponents: [FactureDeleteDialogComponent]
})
export class PrintedFactureModule {}
