import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'produits',
        loadChildren: () => import('./produits/produits.module').then(m => m.JhipsterPrintedProduitsModule)
      },
      {
        path: 'facture',
        loadChildren: () => import('./facture/facture.module').then(m => m.JhipsterPrintedFactureModule)
      },
      {
        path: 'expedition',
        loadChildren: () => import('./expedition/expedition.module').then(m => m.JhipsterPrintedExpeditionModule)
      },
      {
        path: 'panier',
        loadChildren: () => import('./panier/panier.module').then(m => m.JhipsterPrintedPanierModule)
      },
      {
        path: 'commande',
        loadChildren: () => import('./commande/commande.module').then(m => m.JhipsterPrintedCommandeModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.JhipsterPrintedClientModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterPrintedEntityModule {}
