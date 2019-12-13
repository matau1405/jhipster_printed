import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProduitsNoPerso } from 'app/shared/model/produits-no-perso.model';

type EntityResponseType = HttpResponse<IProduitsNoPerso>;
type EntityArrayResponseType = HttpResponse<IProduitsNoPerso[]>;

@Injectable({ providedIn: 'root' })
export class ProduitsNoPersoService {
  public resourceUrl = SERVER_API_URL + 'api/produits-no-persos';

  constructor(protected http: HttpClient) {}

  create(produitsNoPerso: IProduitsNoPerso): Observable<EntityResponseType> {
    return this.http.post<IProduitsNoPerso>(this.resourceUrl, produitsNoPerso, { observe: 'response' });
  }

  update(produitsNoPerso: IProduitsNoPerso): Observable<EntityResponseType> {
    return this.http.put<IProduitsNoPerso>(this.resourceUrl, produitsNoPerso, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IProduitsNoPerso>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduitsNoPerso[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
