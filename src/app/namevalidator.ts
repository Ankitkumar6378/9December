import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class NameValidator {
    static noWhiteSpace(control: AbstractControl) : ValidationErrors | null {
        const isWhitespace = (control.value).trim()
        const isValid = !isWhitespace;
        return (isValid ? null : { "whitespace": true });
    }
}