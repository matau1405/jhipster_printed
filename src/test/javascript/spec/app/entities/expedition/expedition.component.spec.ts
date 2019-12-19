import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterPrintedTestModule } from '../../../test.module';
import { ExpeditionComponent } from 'app/entities/expedition/expedition.component';
import { ExpeditionService } from 'app/entities/expedition/expedition.service';
import { Expedition } from 'app/shared/model/expedition.model';

describe('Component Tests', () => {
  describe('Expedition Management Component', () => {
    let comp: ExpeditionComponent;
    let fixture: ComponentFixture<ExpeditionComponent>;
    let service: ExpeditionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterPrintedTestModule],
        declarations: [ExpeditionComponent],
        providers: []
      })
        .overrideTemplate(ExpeditionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExpeditionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpeditionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Expedition('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.expeditions[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
