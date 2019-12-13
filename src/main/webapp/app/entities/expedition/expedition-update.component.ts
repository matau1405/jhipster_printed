import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IExpedition, Expedition } from 'app/shared/model/expedition.model';
import { ExpeditionService } from './expedition.service';

@Component({
  selector: 'jhi-expedition-update',
  templateUrl: './expedition-update.component.html'
})
export class ExpeditionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    trackingCode: [],
    date: [null, [Validators.required]],
    details: []
  });

  constructor(protected expeditionService: ExpeditionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ expedition }) => {
      this.updateForm(expedition);
    });
  }

  updateForm(expedition: IExpedition) {
    this.editForm.patchValue({
      id: expedition.id,
      trackingCode: expedition.trackingCode,
      date: expedition.date != null ? expedition.date.format(DATE_TIME_FORMAT) : null,
      details: expedition.details
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const expedition = this.createFromForm();
    if (expedition.id !== undefined) {
      this.subscribeToSaveResponse(this.expeditionService.update(expedition));
    } else {
      this.subscribeToSaveResponse(this.expeditionService.create(expedition));
    }
  }

  private createFromForm(): IExpedition {
    return {
      ...new Expedition(),
      id: this.editForm.get(['id']).value,
      trackingCode: this.editForm.get(['trackingCode']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      details: this.editForm.get(['details']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpedition>>) {
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
