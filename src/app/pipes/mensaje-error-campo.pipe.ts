import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Pipe({
  name: 'mensajeErrorCampo',
})
export class MensajeErrorCampoPipe implements PipeTransform {
  transform(
    errorKey: string,
    campoHTML: AbstractControl | AbstractControlDirective
  ): string {
    let listaMensajesError: string = '';
    let mensajeError: any = {
      // Validaciones reservadas de la clase Validator.
      required: () => 'mensajeErrorCampo.campoObligatorio',
      maxlength: (params: any) =>
        `Maximum ${params.requiredLength} characters are allowed`,
      minlength: (params: any) =>
        `Minimum ${params.requiredLength} characters are required`,
      pattern: (params: any) => 'mensajeErrorCampo.formatoIncorrecto',
      min: (params: any) => `Minimum amount should be ₹ ${params.min}`,
      whitespace: (params: any) => `White spaces are not allowed`,
      maxLengthExceeded: (params: any) => 'mensajeErrorCampo.maxLengthExceeded',
      // Validaciones personalizadas.
      identificacion: () => 'mensajeErrorCampo.identificacionIncorrecta',
    };

    if (!campoHTML) return '';

    if (campoHTML.errors) {
      Object.keys(campoHTML.errors).map((error) => {
        campoHTML.touched || campoHTML.dirty
          ? (listaMensajesError = mensajeError[error](campoHTML.errors![error]))
          : '';
      });

      return listaMensajesError;
    } else {
      return '';
    }
  }
}
