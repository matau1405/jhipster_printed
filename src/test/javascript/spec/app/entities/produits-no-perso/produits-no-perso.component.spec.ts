import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrintedTestModule } from '../../../test.module';
import { ProduitsNoPersoComponent } from 'app/entities/produits-no-perso/produits-no-perso.component';
import { ProduitsNoPersoService } from 'app/entities/produits-no-perso/produits-no-perso.service';
import { ProduitsNoPerso } from 'app/shared/model/produits-no-perso.model';

describe('Component Tests', () => {
  describe('ProduitsNoPerso Management Component', () => {
    let comp: ProduitsNoPersoComponent;
    let fixture: ComponentFixture<ProduitsNoPersoComponent>;
    let service: ProduitsNoPersoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrintedTestModule],
        declarations: [ProduitsNoPersoComponent],
        providers: []
      })
        .overrideTemplate(ProduitsNoPersoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProduitsNoPersoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProduitsNoPersoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProduitsNoPerso('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.produitsNoPersos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
