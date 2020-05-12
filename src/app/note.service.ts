import { Injectable } from '@angular/core';
import { HttpService } from './core/http/http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { Note } from './model/Note.model';
import { ApiResponse } from './model/ApiResponse.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpService, private message: NzMessageService) {
  }

  getAll(): Observable<Note[]> {
    return this.http.get('/notes')
      .pipe(map((res: ApiResponse) => {
        return res.data;
      }));
  }

  create(content: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/notes', {content});
  }

  update(id: string, content: string, done: boolean): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`/notes/${id}`, {content, done});
  }

  remove(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`/notes/${id}`);
  }
}
