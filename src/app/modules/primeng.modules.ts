import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
// import { SlideMenuModule } from 'primeng/slidemenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  exports: [
    RadioButtonModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    ButtonModule,
    InputNumberModule,
    DynamicDialogModule,
    CheckboxModule,
    RippleModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    TooltipModule,
    ToastModule,
    InputSwitchModule,
    MenubarModule,
    MegaMenuModule,
    //   SlideMenuModule,
    StepsModule,
    TabMenuModule,
    TabViewModule,
    MessageModule,
    MessagesModule,
    ConfirmPopupModule,
    TieredMenuModule,
    PanelMenuModule,
    TagModule,
  ],
})
export class PrimeNgModules {}
