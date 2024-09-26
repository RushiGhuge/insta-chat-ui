import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { SharedModule } from '../../shared/shared.module';
import { RoomComponent } from '../room/room.component';
import { MessageTextComponent } from '../message-text/message-text.component';
import { MatMenuModule } from '@angular/material/menu';
import { SendMessageComponent } from '../room/send-message/send-message.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
@NgModule({
  declarations: [
    DashboardComponent,
    ListItemComponent,
    RoomComponent,
    MessageTextComponent,
    SendMessageComponent,
  ],
  imports: [CommonModule, SharedModule, MatMenuModule, PickerComponent],
})
export class DashboardModule {}
