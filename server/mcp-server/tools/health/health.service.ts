export class HealthService {
    getHealth() {
        return {
            status: 'running',
            timestamp: new Date().toISOString(),
        };
    }
}