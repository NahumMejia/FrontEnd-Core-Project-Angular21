export interface ErrorMessage {
  summary: string;
  detail: string;
}

export const BACKEND_ERROR_MESSAGES: Record<string, ErrorMessage> = {
  USER_ALREADY_EXISTS: { summary: 'Duplicate user', detail: 'The email is already registered.' },
  INVALID_CREDENTIALS: { summary: 'Credentials', detail: 'Incorrect username or password.' },
  ACCOUNT_DISABLED: { summary: 'Account disabled', detail: 'Contact the administrator.' },
  TOKEN_EXPIRED: { summary: 'Session expired', detail: 'Please log in again.' },
};

export const HTTP_ERROR_MESSAGES: Record<number, ErrorMessage> = {
  0: { summary: 'No connection', detail: 'Could not connect to the server.' },
  400: { summary: 'Invalid request', detail: 'The submitted data is not valid.' },
  401: { summary: 'Unauthorized', detail: 'Your session has expired. Please log in again.' },
  403: { summary: 'Access denied', detail: 'You do not have permission to perform this action.' },
  404: { summary: 'Not found', detail: 'The requested resource does not exist.' },
  409: { summary: 'Conflict', detail: 'A record with this data already exists.' },
  422: { summary: 'Validation error', detail: 'The data did not pass validation.' },
  429: { summary: 'Too many requests', detail: 'You have exceeded the request limit.' },
  500: { summary: 'Server error', detail: 'Internal error. Please try again later.' },
  502: { summary: 'Service unavailable', detail: 'The server is not available.' },
  503: { summary: 'Service unavailable', detail: 'The server is not available.' },
  504: { summary: 'Service unavailable', detail: 'The server is not available.' },
};

export const DEFAULT_ERROR_MESSAGE: ErrorMessage = {
  summary: 'Unexpected error',
  detail: 'An unexpected error occurred.',
};
