import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IFacture } from 'app/shared/model/facture.model';
import { AccountService } from 'app/core/auth/account.service';
import { FactureService } from './facture.service';

@Component({
  selector: 'jhi-facture',
  templateUrl: './facture.component.html'
})
export class FactureComponent implements OnInit, OnDestroy {
  factures: IFacture[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected factureService: FactureService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.factureService
      .query()
      .pipe(
        filter((res: HttpResponse<IFacture[]>) => res.ok),
        map((res: HttpResponse<IFacture[]>) => res.body)
      )
      .subscribe((res: IFacture[]) => {
        this.factures = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFactures();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFacture) {
    return item.id;
  }

  registerChangeInFactures() {
    this.eventSubscriber = this.eventManager.subscribe('factureListModification', response => this.loadAll());
  }
}
