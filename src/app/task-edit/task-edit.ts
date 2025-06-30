import { Component, Input, numberAttribute } from '@angular/core';
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

}
