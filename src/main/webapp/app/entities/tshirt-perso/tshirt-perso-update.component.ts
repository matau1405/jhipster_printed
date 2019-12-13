import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITshirtPerso, TshirtPerso } from 'app/shared/model/tshirt-perso.model';
import { TshirtPersoService } from './tshirt-perso.service';

@Component({
  selector: 'jhi-tshirt-perso-update',
  templateUrl: './tshirt-perso-update.component.html'
})
export class TshirtPersoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected tshirtPersoService: TshirtPersoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tshirtPerso }) => {
      this.updateForm(tshirtPerso);
    });
  }

  updateForm(tshirtPerso: ITshirtPerso) {
    this.editForm.patchValue({
      id: tshirtPerso.id
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tshirtPerso = this.createFromForm();
    if (tshirtPerso.id !== undefined) {
      this.subscribeToSaveResponse(this.tshirtPersoService.update(tshirtPerso));
    } else {
      this.subscribeToSaveResponse(this.tshirtPersoService.create(tshirtPerso));
    }
  }

  private createFromForm(): ITshirtPerso {
    return {
      ...new TshirtPerso(),
      id: this.editForm.get(['id']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITshirtPerso>>) {
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
