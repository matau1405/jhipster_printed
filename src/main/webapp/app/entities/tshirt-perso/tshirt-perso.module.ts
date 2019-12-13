import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrintedSharedModule } from 'app/shared/shared.module';
import { TshirtPersoComponent } from './tshirt-perso.component';
import { TshirtPersoDetailComponent } from './tshirt-perso-detail.component';
import { TshirtPersoUpdateComponent } from './tshirt-perso-update.component';
import { TshirtPersoDeletePopupComponent, TshirtPersoDeleteDialogComponent } from './tshirt-perso-delete-dialog.component';
import { tshirtPersoRoute, tshirtPersoPopupRoute } from './tshirt-perso.route';

const ENTITY_STATES = [...tshirtPersoRoute, ...tshirtPersoPopupRoute];

@NgModule({
  imports: [PrintedSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TshirtPersoComponent,
    TshirtPersoDetailComponent,
    TshirtPersoUpdateComponent,
    TshirtPersoDeleteDialogComponent,
    TshirtPersoDeletePopupComponent
  ],
  entryComponents: [TshirtPersoDeleteDialogComponent]
})
export class PrintedTshirtPersoModule {}
