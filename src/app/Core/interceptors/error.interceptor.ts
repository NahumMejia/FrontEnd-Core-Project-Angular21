import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { DEFAULT_ERROR_MESSAGE, HTTP_ERROR_MESSAGES } from '../constants/error-messages.const';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const backendErrors = error.error?.errors;
      const backendMessage = error.error?.message;

      const { summary, detail } = backendErrors
        ? { summary: 'Validation error', detail: Object.values(backendErrors).join('\n') }
        : backendMessage
          ? { summary: 'Error', detail: backendMessage }
          : HTTP_ERROR_MESSAGES[error.status] ?? DEFAULT_ERROR_MESSAGE;

      notificationService.error(summary, detail);
      return throwError(() => error);
    }),
  );
};
