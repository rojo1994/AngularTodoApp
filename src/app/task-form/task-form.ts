import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  imports: [],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {

  toastr = inject(ToastrService);

  // taskFG: FormGroup<>;


  
}
