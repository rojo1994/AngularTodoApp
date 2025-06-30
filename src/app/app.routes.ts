import { Routes } from '@angular/router';
import { TaskList } from './task-list/task-list';
import { TaskForm } from './task-form/task-form';
import { TaskEdit } from './task-edit/task-edit';

export const routes: Routes = [
    {path: 'tasks', component: TaskList},
    {path: 'task/create', component: TaskForm},
    {path: 'task/edit/:id', component: TaskEdit}
];
