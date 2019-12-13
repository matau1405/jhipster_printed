import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITshirtPerso } from 'app/shared/model/tshirt-perso.model';
import { TshirtPersoService } from './tshirt-perso.service';

@Component({
  selector: 'jhi-tshirt-perso-delete-dialog',
  templateUrl: './tshirt-perso-delete-dialog.component.html'
})
export class TshirtPersoDeleteDialogComponent {
  tshirtPerso: ITshirtPerso;

  constructor(
    protected tshirtPersoService: TshirtPersoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.tshirtPersoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tshirtPersoListModification',
        content: 'Deleted an tshirtPerso'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tshirt-perso-delete-popup',
  template: ''
})
export class TshirtPersoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tshirtPerso }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TshirtPersoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tshirtPerso = tshirtPerso;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tshirt-perso', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tshirt-perso', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
