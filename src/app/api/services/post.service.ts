import { Injectable } from '@angular/core';
import { PostHttpService } from '../httpservice/post.http.service';
import { Observable } from 'rxjs';
import { IPersonDto } from '../dto';
import { IPoints } from 'src/app/core';

@Injectable()
export class PostService {

    constructor(private postHttpService: PostHttpService) {
    }

    getPost(): Observable<IPersonDto[]> {
        return Observable.create(observer => {
            const params: IPoints = {
                relations: new Array<string>()
            };
            params.relations.push('author');
            params.relations.push('country');
            this.postHttpService.getPosts(params).subscribe(value => {
                observer.next(value);
            });
        });
    }
}
