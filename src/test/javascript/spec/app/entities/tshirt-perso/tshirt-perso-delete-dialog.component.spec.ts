import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrintedTestModule } from '../../../test.module';
import { TshirtPersoDeleteDialogComponent } from 'app/entities/tshirt-perso/tshirt-perso-delete-dialog.component';
import { TshirtPersoService } from 'app/entities/tshirt-perso/tshirt-perso.service';

describe('Component Tests', () => {
  describe('TshirtPerso Management Delete Component', () => {
    let comp: TshirtPersoDeleteDialogComponent;
    let fixture: ComponentFixture<TshirtPersoDeleteDialogComponent>;
    let service: TshirtPersoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrintedTestModule],
        declarations: [TshirtPersoDeleteDialogComponent]
      })
        .overrideTemplate(TshirtPersoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TshirtPersoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TshirtPersoService);
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
