import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serializer } from './serializer';
import { CoreHttpParams } from './core.HttpParams';
import { RelationsModel } from '../relationships';

export interface IPoints {
  params?: Map<string, any>;
  endPoint?: string;
  relations?: Array<string>;
}
export abstract class HttpApiClient {
  private serializer: Serializer;

  constructor(
    protected httpClient: HttpClient,
    protected param: CoreHttpParams,
    protected relations: RelationsModel) {
  }


  protected headersClient: HttpHeaders;
  protected url: string;

  protected get<T>(params: IPoints): Observable<T[]> {
    const headers: HttpHeaders = this.headersClient;
    const urlTo = `${this.url}/${this.param.transformUrl(params.params, params.endPoint)}${this.relations.addRelationalMap(params.relations)}`;
    return this.httpClient
      .get(urlTo, { headers: headers, observe: 'response' })
      .map((data: any) => this.convertData<T>(data));
  }

  protected getResponse<T>(params: IPoints): Observable<T> {
    const headers: HttpHeaders = this.headersClient;
    const urlTo = `${this.url}/${this.param.transformUrl(params.params, params.endPoint)}`;
    return this.httpClient
      .get(urlTo, { headers: headers, observe: 'response' })
      .map(data => data['body'] as any);
  }

  protected post<T>(item: T, params: IPoints): Observable<T> {
    const headers: HttpHeaders = this.headersClient;
    const urlTo = `${this.url}/${this.param.transformUrl(params.params, params.endPoint)}`;
    return this.httpClient
      .post<T>(urlTo, item, { headers: headers })
      .map(data => data as T);
  }

  protected postResponse<T, TResponse>(item: T, params: IPoints): Observable<TResponse> {
    const headers: HttpHeaders = this.headersClient;
    const urlTo = `${this.url}/${this.param.transformUrl(params.params, params.endPoint)}`;
    return this.httpClient
      .post<T>(urlTo, item, { headers: headers })
      .map(data => data as any);
  }

  protected put<T>(item: T, params: IPoints): Observable<T> {
    // tslint:disable-next-line: prefer-const
    let headers: HttpHeaders = this.headersClient;
    return this.httpClient
      .put<T>(`${this.url}/${params.endPoint}/${item['id']}`,
        this.serializer.toJson(item), { headers })
      .map(data => this.serializer.fromJson(data) as T);
  }

  protected getById<T>(id: number, params?: IPoints): Observable<T[]> {
    const headers: HttpHeaders = this.headersClient;
    return this.httpClient
      .get(`${this.url}/${params.endPoint}?${id}`, { headers })
      .map((data: any) => data['data']);

  }

  protected delete(params: IPoints, id: number) {
    const headers: HttpHeaders = this.headersClient;
    return this.httpClient
      .delete(`${this.url}/${params.endPoint}/${id}`, { headers });
  }

  protected patch<T>(item: T, params: IPoints) {
    const headers: HttpHeaders = this.headersClient;
    const urlTo = `${this.url}/${this.param.transformUrl(params.params, params.endPoint)}`;
    return this.httpClient
      .patch<T>(urlTo, item, { headers })
      .map(data => data as T);
  }


  protected convertData<T>(data: any): T[] {
    return data;
  }
}
