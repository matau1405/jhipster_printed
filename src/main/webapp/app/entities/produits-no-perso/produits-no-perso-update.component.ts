import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduitsNoPerso, ProduitsNoPerso } from 'app/shared/model/produits-no-perso.model';
import { ProduitsNoPersoService } from './produits-no-perso.service';

@Component({
  selector: 'jhi-produits-no-perso-update',
  templateUrl: './produits-no-perso-update.component.html'
})
export class ProduitsNoPersoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    typeProduits: []
  });

  constructor(
    protected produitsNoPersoService: ProduitsNoPersoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ produitsNoPerso }) => {
      this.updateForm(produitsNoPerso);
    });
  }

  updateForm(produitsNoPerso: IProduitsNoPerso) {
    this.editForm.patchValue({
      id: produitsNoPerso.id,
      typeProduits: produitsNoPerso.typeProduits
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const produitsNoPerso = this.createFromForm();
    if (produitsNoPerso.id !== undefined) {
      this.subscribeToSaveResponse(this.produitsNoPersoService.update(produitsNoPerso));
    } else {
      this.subscribeToSaveResponse(this.produitsNoPersoService.create(produitsNoPerso));
    }
  }

  private createFromForm(): IProduitsNoPerso {
    return {
      ...new ProduitsNoPerso(),
      id: this.editForm.get(['id']).value,
      typeProduits: this.editForm.get(['typeProduits']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduitsNoPerso>>) {
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
