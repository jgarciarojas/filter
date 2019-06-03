import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serializer } from './serializer';
import { CoreHttpParams } from './core.HttpParams';

export interface IPoints {
  params?: Map<string, any>;
  endPoint?: string;
}
export abstract class HttpApiClient {
  private serializer: Serializer;

  constructor(
    private httpClient: HttpClient,
    private param: CoreHttpParams) {
  }


  protected headersClient: HttpHeaders;
  protected url: string;

  protected get<T>(params: IPoints): Observable<T[]> {
    let headers: HttpHeaders = this.headersClient;
    const urlTo = `${this.url}/${this.param.transformUrl(params.params, params.endPoint)}`;
    return this.httpClient
      .get(urlTo, { headers: headers, observe: 'response' })
      .map((data: any) => this.convertData<T>(data));
  }

  protected getResponse<T>(params: IPoints): Observable<T> {
    let headers: HttpHeaders = this.headersClient;
    const urlTo = `${this.url}/${this.param.transformUrl(params.params, params.endPoint)}`;
    return this.httpClient
      .get(urlTo, { headers: headers, observe: 'response' })
      .map(data => data['body'] as any);
  }

  protected post<T>(item: T, params: IPoints): Observable<T> {
    let headers: HttpHeaders = this.headersClient;
    const urlTo = `${this.url}/${this.param.transformUrl(params.params, params.endPoint)}`;
    return this.httpClient
      .post<T>(urlTo, item, { headers: headers })
      .map(data => data as T);
  }

  protected postResponse<T, TResponse>(item: T, params: IPoints): Observable<TResponse> {
    let headers: HttpHeaders = this.headersClient;
    const urlTo = `${this.url}/${this.param.transformUrl(params.params, params.endPoint)}`;
    return this.httpClient
      .post<T>(urlTo, item, { headers: headers })
      .map(data => data as any);
  }

  protected put<T>(item: T, params: IPoints): Observable<T> {
    var headers: HttpHeaders = this.headersClient;
    return this.httpClient
      .put<T>(`${this.url}/${params.endPoint}/${item['id']}`,
        this.serializer.toJson(item), { headers })
      .map(data => this.serializer.fromJson(data) as T);
  }

  protected getById<T>(id: number, params?: IPoints): Observable<T[]> {
    var headers: HttpHeaders = this.headersClient;
    return this.httpClient
      .get(`${this.url}/${params.endPoint}?${id}`, { headers })
      .map((data: any) => data['data']);

  }

  protected delete(params: IPoints, id: number) {
    var headers: HttpHeaders = this.headersClient;
    return this.httpClient
      .delete(`${this.url}/${params.endPoint}/${id}`, { headers });
  }

  protected patch<T>(item: T, params: IPoints) {
    var headers: HttpHeaders = this.headersClient;
    const urlTo = `${this.url}/${this.param.transformUrl(params.params, params.endPoint)}`;
    return this.httpClient
      .patch<T>(urlTo, item, { headers })
      .map(data => data as T);
  }


  protected convertData<T>(data: any): T[] {
    return data;
  }
}
