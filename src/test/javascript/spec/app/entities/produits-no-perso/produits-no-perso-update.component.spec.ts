import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PrintedTestModule } from '../../../test.module';
import { ProduitsNoPersoUpdateComponent } from 'app/entities/produits-no-perso/produits-no-perso-update.component';
import { ProduitsNoPersoService } from 'app/entities/produits-no-perso/produits-no-perso.service';
import { ProduitsNoPerso } from 'app/shared/model/produits-no-perso.model';

describe('Component Tests', () => {
  describe('ProduitsNoPerso Management Update Component', () => {
    let comp: ProduitsNoPersoUpdateComponent;
    let fixture: ComponentFixture<ProduitsNoPersoUpdateComponent>;
    let service: ProduitsNoPersoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrintedTestModule],
        declarations: [ProduitsNoPersoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProduitsNoPersoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProduitsNoPersoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProduitsNoPersoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProduitsNoPerso('123');
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
        const entity = new ProduitsNoPerso();
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
