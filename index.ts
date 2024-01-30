import * as logsAPI from "@opentelemetry/api-logs";
import {SeverityNumber} from "@opentelemetry/api-logs";
import {diag, DiagConsoleLogger, DiagLogLevel} from "@opentelemetry/api";
import {OTLPLogExporter} from "@opentelemetry/exporter-logs-otlp-http";
import {ConsoleLogRecordExporter, LoggerProvider, SimpleLogRecordProcessor} from "@opentelemetry/sdk-logs";

// uncommenting this will cause OTel SDK diagnostics logs to be sent to the console, not recommended for production use,
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);

const loggerProvider = new LoggerProvider({});

// Currently no impl of BatchLogRecordProcessorBase exists
loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()));
loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(new OTLPLogExporter({
    keepAlive: true
})));
logsAPI.logs.setGlobalLoggerProvider(loggerProvider);
const logger = logsAPI.logs.getLogger('bla');
setInterval(() => {
    logger.emit({
        body: 'bla',
        severityNumber: SeverityNumber.DEBUG2
    })
}, 1000);