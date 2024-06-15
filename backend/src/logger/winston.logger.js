import winston from "winston";

// Define severity levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// method to set the current severity based on NODE_ENV
const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

// Define defferent colors for each level
const colors = {
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "white",
};

// add colors to winston
winston.addColors(colors);

// customizing the log format
const format = winston.format.combine(
  // add the message timestamp with the preferred format
  winston.format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss:ms" }),

  // tell winston that logs must be colored
  winston.format.colorize({ all: true }),

  // Define the format of the message showing the timestamp, the level and the message

  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message} `
  )
);

// Define where the log should go (here in terminal)
const transports = [new winston.transports.Console()];

// Create the logger

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
