export class HealthTool {
    execute() {
        return {
            status: 'running',
            timestamp: new Date().toISOString(),
        };
    }
}