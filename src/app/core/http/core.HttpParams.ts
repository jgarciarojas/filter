import { Injectable } from '@angular/core';


@Injectable()
export class CoreHttpParams {
  transformUrl(params: Map<any, any>, url: string): string {
    if (params) {
      const keys = this.getProperties(params);
      for (let i = 0; i < keys.length; i++) {
        const value: any = params.get(keys[i]);
        if (value === undefined) {
          url = url.replace(keys[i].toString(), '');
        } else {
          url = url.replace(keys[i].toString(), value);
        }
      }
    }
    return url;
  }



  private getProperties(parameters: Map<any, any>): Array<string> {
    const properties = [];
    parameters.forEach((value: any, key: any) => {
      properties.push(key);
    });
    return properties;
  }


}
