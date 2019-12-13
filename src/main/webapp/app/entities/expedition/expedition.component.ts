import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IExpedition } from 'app/shared/model/expedition.model';
import { AccountService } from 'app/core/auth/account.service';
import { ExpeditionService } from './expedition.service';

@Component({
  selector: 'jhi-expedition',
  templateUrl: './expedition.component.html'
})
export class ExpeditionComponent implements OnInit, OnDestroy {
  expeditions: IExpedition[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected expeditionService: ExpeditionService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.expeditionService
      .query()
      .pipe(
        filter((res: HttpResponse<IExpedition[]>) => res.ok),
        map((res: HttpResponse<IExpedition[]>) => res.body)
      )
      .subscribe((res: IExpedition[]) => {
        this.expeditions = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInExpeditions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExpedition) {
    return item.id;
  }

  registerChangeInExpeditions() {
    this.eventSubscriber = this.eventManager.subscribe('expeditionListModification', response => this.loadAll());
  }
}
