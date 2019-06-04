import { Injectable } from '@angular/core';


@Injectable()
export class RelationsModel {
    addRelationalMap(params: Array<string>): string {
        let result = '?';
        if (params) {
            params.forEach(item => {
                result += '_expand=' + item + '&';
            });
        }
        return result.substring(0, result.length - 1);
    }

}
