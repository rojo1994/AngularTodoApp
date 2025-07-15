import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Task, TaskFG, TaskPost } from '../interfaces/task.interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../service/task-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [MatInputModule,MatFormFieldModule, MatButtonModule, MatCardModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm implements OnInit{
 
  taskService = inject(TaskService);
  toastr = inject(ToastrService);
  private readonly router = inject(Router);

  taskFG!: FormGroup<TaskFG>;
  
  readonly error = signal<string | null>(null);

   ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.taskFG = new FormGroup({
      title: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
    })
  }

  createTask() {
    if (this.taskFG.invalid) return;

    const { title, description } = this.taskFG.getRawValue();

    console.log(title, description);

    const postCreateTask : TaskPost = {
      title,
      description,
      done: false
    }

    console.log(postCreateTask);
    

    this.taskService.createTask(postCreateTask).subscribe({
      next: (resp: Task) => {

        this.toastr.success("Se creo correctamente la tarea.", "Tareas")

        this.router.navigate(['/tasks'])
      }
    })
  

  }

  
}
