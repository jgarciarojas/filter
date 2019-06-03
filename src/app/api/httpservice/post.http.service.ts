import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPersonDto } from '../dto';
import { HeaderClient, Url, HttpApiClient, CoreHttpParams, IPoints } from '../../core';

@Injectable()
@HeaderClient({
    accept: 'application/json',
    content: 'application/json'
})
@Url('http://localhost:3000')


export class PostHttpService extends HttpApiClient {
    constructor(protected http: HttpClient, protected coreParam: CoreHttpParams) {
        super(http, coreParam);
    }

    getPosts(params?: IPoints): Observable<IPersonDto[]> {
        params.endPoint = 'posts';
        return this.get(params).map(videos => {
            return JSON.parse(JSON.stringify(videos));
        })
    }
}
