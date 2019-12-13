import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PrintedTestModule } from '../../../test.module';
import { TshirtPersoUpdateComponent } from 'app/entities/tshirt-perso/tshirt-perso-update.component';
import { TshirtPersoService } from 'app/entities/tshirt-perso/tshirt-perso.service';
import { TshirtPerso } from 'app/shared/model/tshirt-perso.model';

describe('Component Tests', () => {
  describe('TshirtPerso Management Update Component', () => {
    let comp: TshirtPersoUpdateComponent;
    let fixture: ComponentFixture<TshirtPersoUpdateComponent>;
    let service: TshirtPersoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrintedTestModule],
        declarations: [TshirtPersoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TshirtPersoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TshirtPersoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TshirtPersoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TshirtPerso('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TshirtPerso();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
