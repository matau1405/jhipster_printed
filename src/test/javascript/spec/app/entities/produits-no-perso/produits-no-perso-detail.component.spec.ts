import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrintedTestModule } from '../../../test.module';
import { ProduitsNoPersoDetailComponent } from 'app/entities/produits-no-perso/produits-no-perso-detail.component';
import { ProduitsNoPerso } from 'app/shared/model/produits-no-perso.model';

describe('Component Tests', () => {
  describe('ProduitsNoPerso Management Detail Component', () => {
    let comp: ProduitsNoPersoDetailComponent;
    let fixture: ComponentFixture<ProduitsNoPersoDetailComponent>;
    const route = ({ data: of({ produitsNoPerso: new ProduitsNoPerso('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrintedTestModule],
        declarations: [ProduitsNoPersoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProduitsNoPersoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProduitsNoPersoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.produitsNoPerso).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
