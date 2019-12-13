import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrintedTestModule } from '../../../test.module';
import { TshirtPersoDetailComponent } from 'app/entities/tshirt-perso/tshirt-perso-detail.component';
import { TshirtPerso } from 'app/shared/model/tshirt-perso.model';

describe('Component Tests', () => {
  describe('TshirtPerso Management Detail Component', () => {
    let comp: TshirtPersoDetailComponent;
    let fixture: ComponentFixture<TshirtPersoDetailComponent>;
    const route = ({ data: of({ tshirtPerso: new TshirtPerso('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrintedTestModule],
        declarations: [TshirtPersoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TshirtPersoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TshirtPersoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tshirtPerso).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
