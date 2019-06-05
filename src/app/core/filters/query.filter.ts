
export class Query {
    protected get properties(): string[] {
        return Object.getOwnPropertyNames(this).filter((c) => {
            return c !== '_page' && c !== '_sort';
        }).map((v) => {
            return v.replace('_', '');
        });
    }
    protected get propertiesWithValue(): string[] {
        const properties = this.properties;
        const withValue = properties.filter((p) => {
            return this[p];
        });
        return withValue;
    }
}