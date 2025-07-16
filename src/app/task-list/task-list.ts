import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../service/task-service';
import { Task } from '../interfaces/task.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {

  public readonly taskService = inject(TaskService);
  public toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  public tasks: Task[] = [];

  
  public columns = ['Tarea', 'Descripcion', 'Estatus', 'Acciones'];

  ngOnInit(): void {
      this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (resp: Task[]) => {
        this.tasks = resp;
        this.cdr.detectChanges();
      },
      error: () => console.error("Hubo un error al consultar las tareas.")
      
    })
  }

  completeTask(taskId: number) { 
    this.taskService.completeTask(taskId).subscribe({
      next: (resp) => {
        this.toastr.success("La tarea se completo con exito.", "Tareas")
        const task = this.tasks.find(t => t.id === taskId);
        if (task) task.done = true;

        this.cdr.detectChanges();
      }
    })
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: (resp)=> {
        this.tasks = this.tasks?.filter(t => t.id !== id);
        this.toastr.info("La tarea se ha borrado con exito.")
        this.cdr.detectChanges();
      },
      error: () => console.error("Hubo un error al intentar borrar una tarea.")
    });
  }
}
