import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IImage, Image } from 'app/shared/model/image.model';
import { ImageService } from './image.service';

@Component({
  selector: 'jhi-image-update',
  templateUrl: './image-update.component.html'
})
export class ImageUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    url: [],
    longueurImg: [],
    largeurImg: [],
    poidsImg: [],
    positionImg: []
  });

  constructor(protected imageService: ImageService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ image }) => {
      this.updateForm(image);
    });
  }

  updateForm(image: IImage) {
    this.editForm.patchValue({
      id: image.id,
      url: image.url,
      longueurImg: image.longueurImg,
      largeurImg: image.largeurImg,
      poidsImg: image.poidsImg,
      positionImg: image.positionImg
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const image = this.createFromForm();
    if (image.id !== undefined) {
      this.subscribeToSaveResponse(this.imageService.update(image));
    } else {
      this.subscribeToSaveResponse(this.imageService.create(image));
    }
  }

  private createFromForm(): IImage {
    return {
      ...new Image(),
      id: this.editForm.get(['id']).value,
      url: this.editForm.get(['url']).value,
      longueurImg: this.editForm.get(['longueurImg']).value,
      largeurImg: this.editForm.get(['largeurImg']).value,
      poidsImg: this.editForm.get(['poidsImg']).value,
      positionImg: this.editForm.get(['positionImg']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImage>>) {
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
