import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrintedTestModule } from '../../../test.module';
import { TshirtPersoComponent } from 'app/entities/tshirt-perso/tshirt-perso.component';
import { TshirtPersoService } from 'app/entities/tshirt-perso/tshirt-perso.service';
import { TshirtPerso } from 'app/shared/model/tshirt-perso.model';

describe('Component Tests', () => {
  describe('TshirtPerso Management Component', () => {
    let comp: TshirtPersoComponent;
    let fixture: ComponentFixture<TshirtPersoComponent>;
    let service: TshirtPersoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrintedTestModule],
        declarations: [TshirtPersoComponent],
        providers: []
      })
        .overrideTemplate(TshirtPersoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TshirtPersoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TshirtPersoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TshirtPerso('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tshirtPersos[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
