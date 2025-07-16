import { FormControl } from "@angular/forms";

export interface Task {
    id: number;
    title: string;
    description: string;
    done: boolean;
  }
  
  export interface TaskPost {
    title: string;
    description: string;
    done: boolean;
  }

  export interface TaskFG {
    title: FormControl<string>;
    description: FormControl<string>;
  }

  export interface TaskEditFG {
    title: FormControl<string>;
    description: FormControl<string>;
    done: FormControl<boolean>;
  }