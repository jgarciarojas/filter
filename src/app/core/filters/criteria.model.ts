import { HttpResponse, HttpParams } from '@angular/common/http';

export interface IPageChange {
    page: number;
    limit: number;
    value: string;
}

export interface IFilter {
    page: IPageChange;
    filter(): string;
}

export abstract class CriteriaModel<TEntity> {

    protected abstract searchApi(): Promise<HttpResponse<TEntity[]>>;
    protected abstract createFilter(): void;
}


export class Page implements IPageChange {
    _page: number;
    _limit: number;


    get page(): number {
        return this._page;
    }

    set page(value: number) {
        this._page = value;
    }


    get limit(): number {
        return this._limit;
    }

    set limit(value: number) {
        this._limit = value;
    }


    get value(): string {
        return '_limit=' + this._limit + '&_page=' + this._page;
    }

    parameters(params: HttpParams): HttpParams {
        params = params.append('_limit', this._limit.toString());
        params = params.append('_page', this._page.toString());
        return params;
    }
}