import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Faq } from '../models/faq.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(`${this.apiUrl}/faqs?_sort=order&_order=asc`);
  }
}
