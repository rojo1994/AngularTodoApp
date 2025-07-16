import { Routes } from '@angular/router';
import { TaskList } from './task-list/task-list';
import { TaskForm } from './task-form/task-form';
import { TaskEdit } from './task-edit/task-edit';
import { Login } from './login/login';
import { authGuard } from './auth/auth-guard';
import { Register } from './register/register';
import { authRedirectGuard } from './auth/auth-redirect.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    {path: 'tasks', component: TaskList, canActivate: [authGuard]},
    {path: 'task/create', component: TaskForm, canActivate: [authGuard]},
    {path: 'task/edit/:id', component: TaskEdit, canActivate: [authGuard]},
    {path: 'login', component: Login, canActivate: [authRedirectGuard]},
    {path: 'register', component: Register, canActivate: [authRedirectGuard]}
];
