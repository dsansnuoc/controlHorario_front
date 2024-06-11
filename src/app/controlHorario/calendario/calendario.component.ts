import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { CalendarOptions } from '@fullcalendar/core';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {
  allTipoSolicitud,
  allUsuarios,
  allUsuariosOrganizacion,
  listSolicitud,
} from '../../actions';
import { AppState } from '../../app.reducer';
import { MaterialModules } from '../../modules/material.modules';
import { OtherModule } from '../../modules/other.modules';
import { PrimeNgModules } from '../../modules/primeng.modules';
import { SolicitudDTO } from '../../modulesDTO/solicitud.dto';
import { TipoSolicitudDTO } from '../../modulesDTO/tipoSolicitud.dto';
import { UsuariosDTO } from '../../modulesDTO/usuaios.dto';

import allLocales from '@fullcalendar/core/locales-all';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    OtherModule,
    MaterialModules,
    PrimeNgModules,
    FullCalendarModule,
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
})
export class CalendarioComponent implements OnInit, OnDestroy {
  @ViewChild('ngcalendar', { static: false }) ngcalendar!: ElementRef;

  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;

  calendarOptions: CalendarOptions = {
    plugins: [multiMonthPlugin, bootstrap5Plugin, dayGridPlugin],
    initialView: 'multiMonthYear',
    themeSystem: 'bootstrap5',
    locales: allLocales,
    locale: 'es',
    dayCellDidMount: this.handleDayCellContent.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth, multiMonthYear',
    },
  };

  handleDayCellContent(arg: any) {
    if (arg.date.getDay() === 0 || arg.date.getDay() === 6) {
      arg.el.style.backgroundColor = '#FF0000'; // Cambia esto por el color que prefieras
      arg.el.style.color = '#FFFFFF';
    }
  }

  events: any[] = [];
  usuarioSolicitud: UntypedFormControl;

  formulario: UntypedFormGroup;

  tipoSolicitud: TipoSolicitudDTO[] = [];
  usuarios: UsuariosDTO[] = [];
  solicitudes: SolicitudDTO[] = [];

  conection: any;
  org: any;
  rol: any;
  activar: boolean = true;
  idUser: string = '';

  suscripcion: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.usuarioSolicitud = new UntypedFormControl(null, [Validators.required]);

    this.formulario = this.fb.group({
      usuarioSolicitud: this.usuarioSolicitud,
    });
  }
  ngOnInit(): void {
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
    }, 1);

    let user = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.conection = user.organizaciones[0].conection;
    this.org = user.organizaciones;
    this.rol = user.roles;
    this.idUser = user.email;

    this.loadTiposSolicitud();

    setTimeout(() => {
      if (this.org.length === 0) {
        this.loadUsuarios();
      } else {
        this.loadUsuariosOrganizacion(this.org[0].id);
      }
    }, 500);

    setTimeout(() => {
      if (this.rol.length !== 0) {
        const usuarioSolicitudControl = this.formulario.get('usuarioSolicitud');
        if (this.rol[0].id === 1) {
          usuarioSolicitudControl?.enable();
          this.activar = true;
        } else {
          this.activar = false;
          usuarioSolicitudControl?.disable();
        }

        let userAux = this.usuarios.filter(
          (usr) => usr.email === this.idUser
        )[0];
        this.usuarioSolicitud.setValue(userAux.email);
      }
      setTimeout(() => {
        this.loadSolicitudes();
      }, 300);
    }, 300);
  }
  ngOnDestroy(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }

  loadTiposSolicitud() {
    let valores = {
      nombreConexion: this.conection,
    };

    this.store.dispatch(allTipoSolicitud({ conexion: valores }));

    this.store.select('tipoSolicitudApp').subscribe((resultado) => {
      if (resultado.error == undefined && resultado.loading === false) {
        this.tipoSolicitud = [...resultado.tipoSolicitudes];
      }
    });
  }

  loadUsuarios() {
    /*
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
*/
    this.store.dispatch(allUsuarios());

    this.suscripcion = this.store
      .select('usuariosApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading === false) {
          this.usuarios = [...resultado.usuarios];

          this.usuarios = this.usuarios.filter((usr) => usr.activate == true);
        }
      });
  }

  loadUsuariosOrganizacion(id: number) {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
    let valores = {
      id: id,
    };

    this.store.dispatch(allUsuariosOrganizacion({ usuario: valores }));

    this.suscripcion = this.store
      .select('usuariosApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          this.usuarios = [...resultado.usuarios];

          this.usuarios = this.usuarios.filter((usr) => usr.activate == true);
        }
      });
  }

  loadSolicitudes() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
    //  console.log(this.usuarioSolicitud.value);

    let valores = {
      nombreConexion: this.conection,
      user_id: this.usuarioSolicitud.value,
    };

    this.store.dispatch(listSolicitud({ solicitud: valores }));

    this.suscripcion = this.store
      .select('solicitudesApp')
      .subscribe((resultado) => {
        if (resultado.error == undefined && resultado.loading == false) {
          this.solicitudes = [...resultado.solicitudes];

          this.events = [];
          resultado.solicitudes.forEach((solicitud) => {
            const fechaInicial = solicitud.fecha_inicio;
            const fechaFinal = solicitud.fecha_fin;
            const txtSolicitud = solicitud.texto_solicitud;
            const aceptada = solicitud.aceptada;
            if (aceptada) {
              this.events.push({
                start: fechaInicial,
                end: fechaFinal,
                description:
                  txtSolicitud +
                  '(' +
                  this.usuarios.filter((usr) => usr.email === this.idUser)[0]
                    .name +
                  ')',
                title:
                  txtSolicitud +
                  +'(' +
                  this.usuarios.filter((usr) => usr.email === this.idUser)[0]
                    .name +
                  ')',
              });
            }
          });
        }
      });
  }

  generatePDF() {
    // const data = document.getElementById('ngcalendar');

    const data = this.ngcalendar.nativeElement;

    if (data) {
      const originalWidth = data.style.width;
      const originalHeight = data.style.height;
      const originalOverflow = data.style.overflow;

      // Expandir el contenedor temporalmente
      data.style.width = 'auto';
      data.style.height = 'auto';
      data.style.overflow = 'visible';

      const options = {
        background: 'white',
        scale: 3,
        allowTaint: true,
        scrollY: 0,
        useCORS: true,
      };
      html2canvas(data).then((canvas) => {
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        /*
        this.canvas.nativeElement.src = canvas.toDataURL();
        this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
        this.downloadLink.nativeElement.download = 'marble-diagram.png';
        this.downloadLink.nativeElement.click();
*/
        // const imgWidthL = 210; // A4 width in mm
        // const pageHeightL = 295; // A4 height in mm
        // const imgHeightL = (canvas.height * imgWidthL) / canvas.width;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;

        pdf.addImage(
          contentDataURL,
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
        pdf.save('Generated.pdf');
        /*
        data.style.width = originalWidth;
        data.style.height = originalHeight;
        data.style.overflow = originalOverflow;
        */
      });
    }
  }
}
