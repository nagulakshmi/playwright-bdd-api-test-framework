import { createLogger, transports, format, Logger } from 'winston'
import { v4 as uuidv4 } from 'uuid'

const logger: Logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            dirname: 'logs',
            filename: `${uuidv4()}.log`,
        })
    ],
    format: format.combine(
        format.colorize(),
        format.simple(),
        format.prettyPrint(),
        format.metadata(),
        format.splat(),
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.printf(({timestamp, level, message, metadata}: any) => {
          return `[${timestamp} ${level}]: ${message}`
        })
    )
})

export default logger