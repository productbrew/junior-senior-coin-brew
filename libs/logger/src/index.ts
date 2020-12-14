import pino from 'pino';

/**
 * Map pino levels to GCP,
 *
 * source: https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
 *
 * @param label
 */
function getGoogleLogSeverity(label: string) {
  switch (label) {
    case 'trace':
      return 'DEBUG';
    case 'debug':
      return 'DEBUG';
    case 'info':
      return 'INFO';
    case 'warn':
      return 'WARNING';
    case 'error':
      return 'ERROR';
    case 'fatal':
      return 'CRITICAL';
    default:
      return 'DEFAULT';
  }
}

/**
 * Logger instance
 */
export const logger = pino({
  prettyPrint: process.env.NODE_ENV !== 'production',
  base: null,
  messageKey: 'message',
  formatters: {
    level: (level: string) => ({
      severity: getGoogleLogSeverity(level),
    }),
  },
});
