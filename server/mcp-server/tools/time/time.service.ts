export class TimeService {
    now(): string {
        return new Date().toISOString();
    }
}