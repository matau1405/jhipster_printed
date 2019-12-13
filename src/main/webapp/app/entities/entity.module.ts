import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'produits',
        loadChildren: () => import('./produits/produits.module').then(m => m.PrintedProduitsModule)
      },
      {
        path: 'facture',
        loadChildren: () => import('./facture/facture.module').then(m => m.PrintedFactureModule)
      },
      {
        path: 'expedition',
        loadChildren: () => import('./expedition/expedition.module').then(m => m.PrintedExpeditionModule)
      },
      {
        path: 'panier',
        loadChildren: () => import('./panier/panier.module').then(m => m.PrintedPanierModule)
      },
      {
        path: 'commande',
        loadChildren: () => import('./commande/commande.module').then(m => m.PrintedCommandeModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.PrintedClientModule)
      },
      {
        path: 'produits-no-perso',
        loadChildren: () => import('./produits-no-perso/produits-no-perso.module').then(m => m.PrintedProduitsNoPersoModule)
      },
      {
        path: 'tshirt-perso',
        loadChildren: () => import('./tshirt-perso/tshirt-perso.module').then(m => m.PrintedTshirtPersoModule)
      },
      {
        path: 'image',
        loadChildren: () => import('./image/image.module').then(m => m.PrintedImageModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class PrintedEntityModule {}
