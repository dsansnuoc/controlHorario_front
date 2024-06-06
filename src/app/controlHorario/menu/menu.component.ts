import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MaterialModules } from '../../modules/material.modules';
import { OtherModule } from '../../modules/other.modules';
import { PrimeNgModules } from '../../modules/primeng.modules';
import { InformesComponent } from '../informes/informes.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, OtherModule, MaterialModules, PrimeNgModules],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  providers: [MessageService],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private translate: TranslateService, private dialog: MatDialog) {}

  ngOnInit() {
    this.items = [
      {
        id: '1',
        label: 'Fichaje',
        icon: 'pi pi-fw pi-clock',
        routerLink: ['/menu/fichaje'],
        visible: false,
      },
      {
        id: '2',
        label: 'Solicitud',
        icon: 'pi pi-fw pi-clock',
        routerLink: ['/menu/solicitud'],
        visible: false,
      },
      {
        id: '3',
        label: 'Calendario',
        icon: 'pi pi-fw pi-calendar',
        routerLink: ['/menu/calendario'],
        visible: false,
      },
      {
        id: '4',
        label: 'Exportar',
        icon: 'pi pi-fw pi-file-export',
        visible: false,
        items: [
          {
            id: '41',
            label: 'Excel',
            icon: 'pi pi-fw ppi-file-excel',
            command: () => this.openModal('xlsx'),
            visible: false,
          },
          {
            id: '42',
            label: 'PDF',
            icon: 'pi pi-fw pi-file-pdf',
            command: () => this.openModal('pdf'),
            visible: false,
          },
          {
            id: '43',
            label: 'CSV',
            icon: 'pi pi-fw pi-clock',
            command: () => this.openModal('csv'),
            visible: false,
          },
        ],
      },

      {
        id: '5',
        label: 'Herramientas',
        icon: 'pi pi-fw pi-clock',
        visible: false,
        items: [
          {
            id: '51',
            label: this.translate.instant('herramientas.organizaciones'),
            icon: 'pi pi-fw pi-clock',
            routerLink: ['/herramientas/listadoorganizaciones'],
            visible: false,
          },
          {
            id: '52',
            label: this.translate.instant('herramientas.usuarios'),
            icon: 'pi pi-fw pi-clock',
            routerLink: ['/herramientas/listadousuarios'],
            visible: false,
          },
          {
            id: '53',
            label: 'Tipo Solicitud',
            icon: 'pi pi-fw pi-clock',
            visible: false,
            routerLink: ['/herramientas/listadotiposolicitud'],
          },
          {
            id: '54',
            label: 'Tipo Pausa',
            icon: 'pi pi-fw pi-clock',
            visible: false,
            routerLink: ['/herramientas/listadotipopausa'],
          },
        ],
      },

      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        routerLink: ['/login'],
      },
    ];

    this.disbleMenu();
  }
  disbleMenu() {
    if (sessionStorage.getItem('user') !== null) {
      let user = JSON.parse(sessionStorage.getItem('user') ?? '');
      let rol = user.roles[0].id;
      let org = user.organizaciones;
      this.items?.forEach((itemMenu) => {
        switch (rol) {
          case 1:
            if (itemMenu.id === '1') {
              if (org.length !== 0) {
                itemMenu.visible = true;
              }
            }
            if (itemMenu.id === '2') {
              if (org.length !== 0) {
                itemMenu.visible = true;
              }
            }
            if (itemMenu.id === '3') {
              if (org.length !== 0) {
                itemMenu.visible = true;
              }
            }
            if (itemMenu.id === '3') {
              if (org.length !== 0) {
                itemMenu.visible = true;
              }
            }
            if (itemMenu.id === '4') {
              if (org.length !== 0) {
                itemMenu.visible = true;
                itemMenu.items?.forEach((itemSubMenu) => {
                  itemSubMenu.visible = true;
                });
              }
            }

            if (itemMenu.id === '5') {
              itemMenu.visible = true;
              itemMenu.items?.forEach((itemSubMenu) => {
                if (org.length === 0) {
                  if (itemSubMenu.id === '51' || itemSubMenu.id === '52') {
                    itemSubMenu.visible = true;
                  }
                } else {
                  if (itemSubMenu.id !== '51') {
                    itemSubMenu.visible = true;
                  }
                }
              });
            }

            break;

          default:
            if (itemMenu.id === '1') {
              if (org.length !== 0) {
                itemMenu.visible = true;
              }
            }
            if (itemMenu.id === '2') {
              if (org.length !== 0) {
                itemMenu.visible = true;
              }
            }
            if (itemMenu.id === '3') {
              if (org.length !== 0) {
                itemMenu.visible = true;
              }
            }
            if (itemMenu.id === '3') {
              if (org.length !== 0) {
                itemMenu.visible = true;
              }
            }
            if (itemMenu.id === '4') {
              if (org.length !== 0) {
                itemMenu.visible = true;
                itemMenu.items?.forEach((itemSubMenu) => {
                  itemSubMenu.visible = true;
                });
              }
            }

            break;
        }
      });
    }
  }

  openModal(tipo: string) {
    const dialogRef = this.dialog.open(InformesComponent, {
      data: { data: tipo },
      height: '65vh',
      width: '95vh',
      //disableClose: true,
    });
  }
}

/*
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark',
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video',
              },
            ],
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
          },
          {
            separator: true,
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link',
          },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print',
                  },
                ],
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
              },
            ],
          },
        ],
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        routerLink: ['/login'],
      },
    ];
*/
