import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IClient, Client } from 'app/shared/model/client.model';
import { ClientService } from './client.service';

@Component({
  selector: 'jhi-client-update',
  templateUrl: './client-update.component.html'
})
export class ClientUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    idClient: [],
    nomClient: [],
    prenomClient: [],
    dateNaissanceClient: [],
    adresseClient: [null, [Validators.required, Validators.maxLength(100)]],
    villeClient: [],
    paysClient: [],
    emailClient: [],
    listCommande: []
  });

  constructor(protected clientService: ClientService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);
    });
  }

  updateForm(client: IClient) {
    this.editForm.patchValue({
      id: client.id,
      idClient: client.idClient,
      nomClient: client.nomClient,
      prenomClient: client.prenomClient,
      dateNaissanceClient: client.dateNaissanceClient,
      adresseClient: client.adresseClient,
      villeClient: client.villeClient,
      paysClient: client.paysClient,
      emailClient: client.emailClient,
      listCommande: client.listCommande
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  private createFromForm(): IClient {
    return {
      ...new Client(),
      id: this.editForm.get(['id']).value,
      idClient: this.editForm.get(['idClient']).value,
      nomClient: this.editForm.get(['nomClient']).value,
      prenomClient: this.editForm.get(['prenomClient']).value,
      dateNaissanceClient: this.editForm.get(['dateNaissanceClient']).value,
      adresseClient: this.editForm.get(['adresseClient']).value,
      villeClient: this.editForm.get(['villeClient']).value,
      paysClient: this.editForm.get(['paysClient']).value,
      emailClient: this.editForm.get(['emailClient']).value,
      listCommande: this.editForm.get(['listCommande']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>) {
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
