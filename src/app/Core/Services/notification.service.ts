import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private readonly messageService = inject(MessageService);

  public success(summary: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      life: 2000,
    });
  }

  public error(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: 2000,
    });
  }

  public warn(summary: string, detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      life: 2000,
    });
  }

  public info(summary: string, detail: string) {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      life: 2000,
    });
  }
}
