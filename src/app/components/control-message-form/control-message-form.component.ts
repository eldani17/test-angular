import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-control-message-form',
  templateUrl: './control-message-form.component.html',
  styleUrls: ['./control-message-form.component.scss'],
})
export class ControlMessageFormComponent {
  @Input() errors = null;

  public validations: Record<string, string> = {
    required: 'Campo requerido',
    maxlength: 'Supero la cantidad maxima de caracteres permitidos',
    minlength: 'Le falta ingresar caracteres',
  };

  get errorsList(): string[] {
    return !this.errors ? [] : Object.keys(this.errors);
  }

  // public getMessageError(value: string): string {
  //   return this.validations[value];
  // }
}
