import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModules } from '../../../modules/material.modules';
import { OtherModule } from '../../../modules/other.modules';
import { PrimeNgModules } from '../../../modules/primeng.modules';

@Component({
  selector: 'app-rechazadas',
  standalone: true,
  imports: [CommonModule, OtherModule, MaterialModules, PrimeNgModules],
  templateUrl: './rechazadas.component.html',
  styleUrl: './rechazadas.component.scss',
})
export class RechazadasComponent {
  motivo: UntypedFormControl;

  formulario: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<RechazadasComponent>,
    @Inject(MAT_DIALOG_DATA) public agenda: any,
    private fb: FormBuilder
  ) {
    this.motivo = new UntypedFormControl(null, [Validators.required]);
    this.formulario = this.fb.group({ motivo: this.motivo });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    const motivo = this.motivo.value;
    this.dialogRef.close({ motivo: motivo });
  }
}
