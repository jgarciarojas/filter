import { IHeaders } from './headers';
import { HttpHeaders } from '@angular/common/http';

export function HeaderClient(header: IHeaders) {
  return function <TFunction extends Function>(Target: TFunction): TFunction {
    let headers = new HttpHeaders();
    if (header.accept) {
      headers = headers.append('Accept', header.accept);
    }
    if (header.content) {
      headers = headers.append('Content-Type', header.content);
    }
    Target.prototype.headersClient = headers;
    return Target;
  };
}

export function Url(url: string) {
  return function <TFunction extends Function>(Target: TFunction): TFunction {
    Target.prototype.url = url;
    return Target;
  };
}
