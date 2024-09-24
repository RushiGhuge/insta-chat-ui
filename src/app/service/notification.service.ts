import { Injectable } from '@angular/core';
// import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // constructor(private notifier: NotifierService) {}

  playReceivesNotification() {
    const audio = new Audio();
    audio.src = 'assets/notifications/livechat-129007.mp3';
    audio.load();
    audio.play();
  }

  showNotification(
    type: 'success' | 'error' | 'warning' | 'info',
    message: string
  ): void {    
    // this.notifier.notify(type, message);
  }

  hideAllNotifications(): void {
    // this.notifier.hideAll();
  }
}
