import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProduitsNoPerso } from 'app/shared/model/produits-no-perso.model';
import { ProduitsNoPersoService } from './produits-no-perso.service';

@Component({
  selector: 'jhi-produits-no-perso-delete-dialog',
  templateUrl: './produits-no-perso-delete-dialog.component.html'
})
export class ProduitsNoPersoDeleteDialogComponent {
  produitsNoPerso: IProduitsNoPerso;

  constructor(
    protected produitsNoPersoService: ProduitsNoPersoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.produitsNoPersoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'produitsNoPersoListModification',
        content: 'Deleted an produitsNoPerso'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-produits-no-perso-delete-popup',
  template: ''
})
export class ProduitsNoPersoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ produitsNoPerso }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProduitsNoPersoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.produitsNoPerso = produitsNoPerso;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/produits-no-perso', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/produits-no-perso', { outlets: { popup: null } }]);
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
