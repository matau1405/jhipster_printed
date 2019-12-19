import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICommande, Commande } from 'app/shared/model/commande.model';
import { CommandeService } from './commande.service';

@Component({
  selector: 'jhi-commande-update',
  templateUrl: './commande-update.component.html'
})
export class CommandeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    idCmd: [],
    dateCmd: [],
    delaiLivraisonCmd: [],
    etatLivraisonCmd: [],
    lieuLivraisonCmd: [],
    modeLivraisonCmd: [],
    prixTotalCmd: [],
    modePaiement: [],
    status: [null, [Validators.required]]
  });

  constructor(protected commandeService: CommandeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ commande }) => {
      this.updateForm(commande);
    });
  }

  updateForm(commande: ICommande) {
    this.editForm.patchValue({
      id: commande.id,
      idCmd: commande.idCmd,
      dateCmd: commande.dateCmd,
      delaiLivraisonCmd: commande.delaiLivraisonCmd,
      etatLivraisonCmd: commande.etatLivraisonCmd,
      lieuLivraisonCmd: commande.lieuLivraisonCmd,
      modeLivraisonCmd: commande.modeLivraisonCmd,
      prixTotalCmd: commande.prixTotalCmd,
      modePaiement: commande.modePaiement,
      status: commande.status
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const commande = this.createFromForm();
    if (commande.id !== undefined) {
      this.subscribeToSaveResponse(this.commandeService.update(commande));
    } else {
      this.subscribeToSaveResponse(this.commandeService.create(commande));
    }
  }

  private createFromForm(): ICommande {
    return {
      ...new Commande(),
      id: this.editForm.get(['id']).value,
      idCmd: this.editForm.get(['idCmd']).value,
      dateCmd: this.editForm.get(['dateCmd']).value,
      delaiLivraisonCmd: this.editForm.get(['delaiLivraisonCmd']).value,
      etatLivraisonCmd: this.editForm.get(['etatLivraisonCmd']).value,
      lieuLivraisonCmd: this.editForm.get(['lieuLivraisonCmd']).value,
      modeLivraisonCmd: this.editForm.get(['modeLivraisonCmd']).value,
      prixTotalCmd: this.editForm.get(['prixTotalCmd']).value,
      modePaiement: this.editForm.get(['modePaiement']).value,
      status: this.editForm.get(['status']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommande>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
