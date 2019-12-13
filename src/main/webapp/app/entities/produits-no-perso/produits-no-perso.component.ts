import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IProduitsNoPerso } from 'app/shared/model/produits-no-perso.model';
import { AccountService } from 'app/core/auth/account.service';
import { ProduitsNoPersoService } from './produits-no-perso.service';

@Component({
  selector: 'jhi-produits-no-perso',
  templateUrl: './produits-no-perso.component.html'
})
export class ProduitsNoPersoComponent implements OnInit, OnDestroy {
  produitsNoPersos: IProduitsNoPerso[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected produitsNoPersoService: ProduitsNoPersoService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.produitsNoPersoService
      .query()
      .pipe(
        filter((res: HttpResponse<IProduitsNoPerso[]>) => res.ok),
        map((res: HttpResponse<IProduitsNoPerso[]>) => res.body)
      )
      .subscribe((res: IProduitsNoPerso[]) => {
        this.produitsNoPersos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProduitsNoPersos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProduitsNoPerso) {
    return item.id;
  }

  registerChangeInProduitsNoPersos() {
    this.eventSubscriber = this.eventManager.subscribe('produitsNoPersoListModification', response => this.loadAll());
  }
}
