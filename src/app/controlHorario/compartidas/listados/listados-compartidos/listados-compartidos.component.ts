import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModules } from '../../../../modules/material.modules';
import { OtherModule } from '../../../../modules/other.modules';
import { PrimeNgModules } from '../../../../modules/primeng.modules';

@Component({
  selector: 'app-listados-compartidos',
  standalone: true,
  imports: [CommonModule, OtherModule, MaterialModules, PrimeNgModules],
  templateUrl: './listados-compartidos.component.html',
  styleUrl: './listados-compartidos.component.scss',
})
export class ListadosCompartidosComponent {
  @Input() valores: any;
  @Input() titulo: any;
  @Input() campos: any;
  @Input() loading: boolean = true;
  @Input() activados: boolean = true;
  @Input() btnEditar: boolean = true;

  @Output() opcionesEvent = new EventEmitter<any>();

  checked: boolean = false;

  crear() {
    this.opcionesEvent.emit({ tipo: 'C' });
  }

  editar(valor: any) {
    this.opcionesEvent.emit({ tipo: 'E', valor: valor });
  }

  onSwitchChange() {
    this.opcionesEvent.emit({ tipo: 'S', valor: this.checked });
  }

  activar(valor: any) {
    this.opcionesEvent.emit({ tipo: 'A', valor: valor });
  }

  borrar(valor: any) {
    this.opcionesEvent.emit({ tipo: 'B', valor: valor });
  }
}
