import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { SharedModule } from '../../shared/shared.module';
import { RoomComponent } from '../room/room.component';
import { MessageTextComponent } from '../message-text/message-text.component';

@NgModule({
  declarations: [DashboardComponent, ListItemComponent, RoomComponent, MessageTextComponent],
  imports: [CommonModule, SharedModule],
})
export class DashboardModule {}
