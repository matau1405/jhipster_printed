import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITshirtPerso } from 'app/shared/model/tshirt-perso.model';

type EntityResponseType = HttpResponse<ITshirtPerso>;
type EntityArrayResponseType = HttpResponse<ITshirtPerso[]>;

@Injectable({ providedIn: 'root' })
export class TshirtPersoService {
  public resourceUrl = SERVER_API_URL + 'api/tshirt-persos';

  constructor(protected http: HttpClient) {}

  create(tshirtPerso: ITshirtPerso): Observable<EntityResponseType> {
    return this.http.post<ITshirtPerso>(this.resourceUrl, tshirtPerso, { observe: 'response' });
  }

  update(tshirtPerso: ITshirtPerso): Observable<EntityResponseType> {
    return this.http.put<ITshirtPerso>(this.resourceUrl, tshirtPerso, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ITshirtPerso>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITshirtPerso[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
