import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITshirtPerso } from 'app/shared/model/tshirt-perso.model';

@Component({
  selector: 'jhi-tshirt-perso-detail',
  templateUrl: './tshirt-perso-detail.component.html'
})
export class TshirtPersoDetailComponent implements OnInit {
  tshirtPerso: ITshirtPerso;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tshirtPerso }) => {
      this.tshirtPerso = tshirtPerso;
    });
  }

  previousState() {
    window.history.back();
  }
}
