import { Component, inject, Input, numberAttribute } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { transform } from 'typescript';

@Component({
  selector: 'app-task-edit',
  imports: [],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css'
})
export class TaskEdit {

  @Input({transform: numberAttribute})
  id!: number;

  toastr = inject(ToastrService);
  

}
