import { FormControl } from "@angular/forms"

export type RegisterFG = {
    username: FormControl<string>,
    password: FormControl<string>
}

export type userType = {
    id: number,
    username: string,
    password: string
}

export type userPost = {
    username: string,
    password: string
}