import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITshirtPerso } from 'app/shared/model/tshirt-perso.model';
import { AccountService } from 'app/core/auth/account.service';
import { TshirtPersoService } from './tshirt-perso.service';

@Component({
  selector: 'jhi-tshirt-perso',
  templateUrl: './tshirt-perso.component.html'
})
export class TshirtPersoComponent implements OnInit, OnDestroy {
  tshirtPersos: ITshirtPerso[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tshirtPersoService: TshirtPersoService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tshirtPersoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITshirtPerso[]>) => res.ok),
        map((res: HttpResponse<ITshirtPerso[]>) => res.body)
      )
      .subscribe((res: ITshirtPerso[]) => {
        this.tshirtPersos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTshirtPersos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITshirtPerso) {
    return item.id;
  }

  registerChangeInTshirtPersos() {
    this.eventSubscriber = this.eventManager.subscribe('tshirtPersoListModification', response => this.loadAll());
  }
}
