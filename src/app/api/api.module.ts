import { NgModule } from '@angular/core';
import { PostHttpService } from './httpservice';
import { PostService } from './services';

@NgModule({
    declarations: [],
    providers: [
        PostHttpService,
        PostService
    ],
    imports: [
    ],
    exports: [
    ]
})

export class ApiModule {
}
