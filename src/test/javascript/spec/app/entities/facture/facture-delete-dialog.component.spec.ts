import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrintedTestModule } from '../../../test.module';
import { FactureDeleteDialogComponent } from 'app/entities/facture/facture-delete-dialog.component';
import { FactureService } from 'app/entities/facture/facture.service';

describe('Component Tests', () => {
  describe('Facture Management Delete Component', () => {
    let comp: FactureDeleteDialogComponent;
    let fixture: ComponentFixture<FactureDeleteDialogComponent>;
    let service: FactureService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrintedTestModule],
        declarations: [FactureDeleteDialogComponent]
      })
        .overrideTemplate(FactureDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FactureDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FactureService);
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
