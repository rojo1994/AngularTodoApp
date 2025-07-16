import { Component, inject, Input, numberAttribute, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { transform } from 'typescript';
import { TaskService } from '../service/task-service';
import { Task, TaskEditFG, TaskPost } from '../interfaces/task.interface';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-edit',
  imports: [MatInputModule,MatFormFieldModule, MatButtonModule, MatCardModule, MatIconModule, MatCheckbox,  ReactiveFormsModule],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css'
})
export class TaskEdit {

  @Input({transform: numberAttribute})
  id!: number;

  toastr = inject(ToastrService);
  taskService = inject(TaskService);

  private readonly router = inject(Router);

  taskFG!: FormGroup<TaskEditFG>;
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.initForms();
    if (this.id) {
      this.loadTask(this.id);
    } else {
      this.error.set('No se proporcionó ID de la tarea');
    }
  }

  initForms() {
    this.taskFG = new FormGroup({
      title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      done: new FormControl(false, { nonNullable: true })
    });
  }

  loadTask(id: number) {
    this.taskService.getTask(id).subscribe({
      next: (task: Task) => {
        this.taskFG.setValue({
          title: task.title,
          description: task.description,
          done: task.done
        });
      },
      error: ( err ) => {
        if (err.status === 404) {
          this.toastr.error("La tarea no existe o no tienes permiso para verla", "Tareas")
        } else {
          this.toastr.error("Error al cargar la tarea", "Tareas")
        }
        this.router.navigate(['/tasks']);
      }
    });
  }

  editTask() {
    if (this.taskFG.invalid) return;

    const { title, description, done } = this.taskFG.getRawValue();

    const updateTask: TaskPost = {
      title,
      description,
      done
    };

    this.taskService.updateTask(this.id, updateTask).subscribe({
      next: () => {
        this.toastr.success('Tarea actualizada correctamente.', 'Tareas');
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.error.set('Error al actualizar la tarea');
      }
    });
  }
  

}
