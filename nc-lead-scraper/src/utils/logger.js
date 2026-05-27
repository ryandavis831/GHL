const COLORS = {
  reset: '\x1b[0m',
  gray: '\x1b[90m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function ts() {
  return new Date().toISOString().replace('T', ' ').replace('Z', '');
}

function fmt(color, level, scope, msg, extra) {
  const head = `${COLORS.gray}[${ts()}]${COLORS.reset} ${color}${level}${COLORS.reset}`;
  const tag = scope ? ` ${COLORS.cyan}(${scope})${COLORS.reset}` : '';
  const tail = extra ? ` ${COLORS.gray}${JSON.stringify(extra)}${COLORS.reset}` : '';
  return `${head}${tag} ${msg}${tail}`;
}

export function createLogger(scope) {
  return {
    info: (msg, extra) => console.log(fmt(COLORS.blue, 'INFO ', scope, msg, extra)),
    warn: (msg, extra) => console.warn(fmt(COLORS.yellow, 'WARN ', scope, msg, extra)),
    error: (msg, extra) => console.error(fmt(COLORS.red, 'ERROR', scope, msg, extra)),
    success: (msg, extra) => console.log(fmt(COLORS.green, 'OK   ', scope, msg, extra)),
    debug: (msg, extra) => {
      if (process.env.DEBUG) console.log(fmt(COLORS.gray, 'DEBUG', scope, msg, extra));
    },
  };
}

export const logger = createLogger();
