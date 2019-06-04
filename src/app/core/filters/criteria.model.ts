import { HttpResponse } from '@angular/common/http';

export interface IPageChange {
    skip: number;
    take: number;
}

export abstract class CriteriaModel<TEntity> {

    protected abstract searchApi(): Promise<HttpResponse<TEntity[]>>;
    protected abstract createFilter(): void;
}
