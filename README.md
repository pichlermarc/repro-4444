# Reproducer for https://github.com/open-telemetry/opentelemetry-js/issues/4444

## How to use
- run `npm ci`
- run `npm run start`
- No logspam is shown from the exporter

If diagnostics logging is turned on, the exporter will log to the console; this is expected.