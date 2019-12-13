import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduitsNoPerso } from 'app/shared/model/produits-no-perso.model';

@Component({
  selector: 'jhi-produits-no-perso-detail',
  templateUrl: './produits-no-perso-detail.component.html'
})
export class ProduitsNoPersoDetailComponent implements OnInit {
  produitsNoPerso: IProduitsNoPerso;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ produitsNoPerso }) => {
      this.produitsNoPerso = produitsNoPerso;
    });
  }

  previousState() {
    window.history.back();
  }
}
