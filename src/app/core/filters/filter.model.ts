import { Query } from './query.filter';
import { IFilter, Page, IPageChange } from './criteria.model';

export class Filter extends Query implements IFilter {
    private _page: Page;

    filter(): string {
        const filters: string[] = this.propertiesWithValue.map((p) => {
            const value = this[p];
            let textFilter: string;
            if (value) {
                textFilter = p + '=' + value;
                return textFilter;
            }
        });
        if (this._page && this._page.limit !== 0 && this._page.page > 0) {
            filters.push(this.page.value);
        }
        return filters.join('&');
    }

    get page(): IPageChange {
        if (!this._page) {
            this._page = new Page();
        }
        return this._page;
    }
}