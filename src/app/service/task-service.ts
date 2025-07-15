import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskPost } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly http: HttpClient = inject(HttpClient);

  private readonly baseUrl = "http://localhost:8000/tasks";

  constructor() { }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }

  public createTask(task : TaskPost): Observable<Task> {
    return  this.http.post<Task>(`${this.baseUrl}`, task);
  }

  public updateTask(id: number, task: TaskPost): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/${id}`, task);
  }

  public deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  public completeTask(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, {});
  }
}
