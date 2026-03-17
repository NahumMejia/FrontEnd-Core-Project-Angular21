import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PanelModule } from 'primeng/panel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


const PRIMENG_MODULES = [
  MenubarModule,
  ToolbarModule,
  ButtonModule,
  CardModule,
  InputTextModule,
  DialogModule,
  TableModule,
  ToastModule,
  SelectModule,
  CheckboxModule,
  RadioButtonModule,
  ToggleSwitchModule,
  ConfirmDialogModule,
  TableModule,
  PanelModule,
  AvatarModule,
  BadgeModule,
  ChipModule,
  InputGroupModule,
  InputGroupAddonModule,
  DividerModule,
  PasswordModule,
  FormsModule,
  FloatLabelModule,
  ProgressBarModule,
  InputTextModule,
  DividerModule,
  TagModule,
];

@NgModule({
  imports: PRIMENG_MODULES,
  exports: PRIMENG_MODULES,
})
export class PrimeNGModule {}
