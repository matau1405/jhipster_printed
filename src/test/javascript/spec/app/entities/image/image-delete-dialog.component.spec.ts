import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrintedTestModule } from '../../../test.module';
import { ImageDeleteDialogComponent } from 'app/entities/image/image-delete-dialog.component';
import { ImageService } from 'app/entities/image/image.service';

describe('Component Tests', () => {
  describe('Image Management Delete Component', () => {
    let comp: ImageDeleteDialogComponent;
    let fixture: ComponentFixture<ImageDeleteDialogComponent>;
    let service: ImageService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrintedTestModule],
        declarations: [ImageDeleteDialogComponent]
      })
        .overrideTemplate(ImageDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImageDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImageService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
