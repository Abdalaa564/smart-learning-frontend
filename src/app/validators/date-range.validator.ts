import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ageRangeValidator(minAge: number, maxAge: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const dob = control.value;
    if (!dob) return null; 

    const today = new Date();
    const birthDate = new Date(dob);

    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

   
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

   
    if (age < minAge || age > maxAge) {
      return { ageOutOfRange: true };
    }

    return null;
  };
}
