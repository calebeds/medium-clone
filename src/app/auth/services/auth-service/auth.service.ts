import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import { RegisterRequestInterface } from 'src/app/auth/types/register-request.interface';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    // const url = 'https://coduit.productionready.io/api/users';
    const url = `${environment.apiUrl}/users`;
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((res: AuthResponseInterface) => res.user));
  }
}
