import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetUserProfileReponseInterface } from '../../types/get-user-profile-response.interface';
import { UserProfileInterface } from '../../types/user-profile.interface';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}`;
    return this.http
      .get<GetUserProfileReponseInterface>(url)
      .pipe(map((res: GetUserProfileReponseInterface) => res.profile));
  }
}
