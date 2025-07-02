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
    console.log(taskId);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: (reso)=> {
        this.tasks = this.tasks?.filter(t => t.id !== id);
        this.toastr.info("La tarea se ha borrado.")
      },
      error: () => console.error("Hubo un error al intentar borrar una tarea.")
    });
  }
}
