import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IFacture, Facture } from 'app/shared/model/facture.model';
import { FactureService } from './facture.service';

@Component({
  selector: 'jhi-facture-update',
  templateUrl: './facture-update.component.html'
})
export class FactureUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    details: [],
    status: [null, [Validators.required]],
    paymentMethod: [null, [Validators.required]],
    paymentDate: [null, [Validators.required]],
    paymentAmount: [null, [Validators.required]]
  });

  constructor(protected factureService: FactureService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ facture }) => {
      this.updateForm(facture);
    });
  }

  updateForm(facture: IFacture) {
    this.editForm.patchValue({
      id: facture.id,
      date: facture.date != null ? facture.date.format(DATE_TIME_FORMAT) : null,
      details: facture.details,
      status: facture.status,
      paymentMethod: facture.paymentMethod,
      paymentDate: facture.paymentDate != null ? facture.paymentDate.format(DATE_TIME_FORMAT) : null,
      paymentAmount: facture.paymentAmount
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const facture = this.createFromForm();
    if (facture.id !== undefined) {
      this.subscribeToSaveResponse(this.factureService.update(facture));
    } else {
      this.subscribeToSaveResponse(this.factureService.create(facture));
    }
  }

  private createFromForm(): IFacture {
    return {
      ...new Facture(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      details: this.editForm.get(['details']).value,
      status: this.editForm.get(['status']).value,
      paymentMethod: this.editForm.get(['paymentMethod']).value,
      paymentDate:
        this.editForm.get(['paymentDate']).value != null ? moment(this.editForm.get(['paymentDate']).value, DATE_TIME_FORMAT) : undefined,
      paymentAmount: this.editForm.get(['paymentAmount']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacture>>) {
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
