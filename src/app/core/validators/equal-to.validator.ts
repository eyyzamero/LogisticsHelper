import { AbstractControl } from "@angular/forms";

export function exactTo(controlName: string, controlMatchingName: string): (form: AbstractControl) => { [key: string]: any } | null {
  return (form: AbstractControl): { [key: string]: any } | null => {
    const control = form.get(controlName);
    const controlMatching = form.get(controlMatchingName);
    
    if (control?.value !== controlMatching?.value)
      return { exactTo: true };
      
    return null;
  }
}