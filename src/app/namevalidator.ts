import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class NameValidator {
    static noWhiteSpace(control: AbstractControl) : ValidationErrors | null {
        const isWhitespace = (control.value).trim()
        const isValid = !isWhitespace;
        return (isValid ? null : { "whitespace": true });
    }
    static removewhitespace(control:AbstractControl):ValidationErrors| null{
        var test=control.value;
        var cleanStr=test.trim();
        return cleanStr;
    }
}