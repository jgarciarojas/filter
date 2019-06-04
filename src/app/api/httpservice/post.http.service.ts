import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPersonDto } from '../dto';
import { HeaderClient, Url, HttpApiClient, CoreHttpParams, IPoints, RelationsModel } from '../../core';
import '../../core/rxjs-extensions';
@Injectable()
@HeaderClient({
    accept: 'application/json',
    content: 'application/json'
})
@Url('http://localhost:3000/api')


export class PostHttpService extends HttpApiClient {
    constructor(protected http: HttpClient,
        protected coreParam: CoreHttpParams,
        protected relations: RelationsModel) {
        super(http, coreParam, relations);
    }

    getPosts(params?: IPoints): Observable<IPersonDto[]> {
        params.endPoint = 'posts';
        return this.get(params).map(videos => {
            return JSON.parse(JSON.stringify(videos));
        })
    }
}
