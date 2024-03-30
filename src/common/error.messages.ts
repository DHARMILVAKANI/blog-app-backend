export const errorMessages = {
  SESSION_EXPIRED: 'Your session has been expired! Please login again!',
  INTERNAL_SERVER_ERROR: 'Internal server error!',
  EMAIL_ALREADY_REGISTERED: 'Email is already registered',
  INVALID_TOKEN: 'Invalid Token!',
  invalidData: (message: string) => `Please enter valid ${message}`,
  notFound: (message: string) => `${message} not found`,
};
