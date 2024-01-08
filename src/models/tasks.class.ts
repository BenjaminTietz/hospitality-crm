export class Tasks {
    date: Date | null;
    property: string;
    status: string;
    priority: string;
    description: string;

    constructor(obj?: any) {
        this.date = obj ? this.convertTimestampToDate(obj.date) : null;
        this.property = obj ? obj.property : '';
        this.status = obj ? obj.status : '';
        this.priority = obj ? obj.priority : '';
        this.description = obj ? obj.description : '';
    }

    public toJSON() {
        return {
            date: this.date instanceof Date ? this.date.toISOString() : this.date,
            property: this.property,
            status: this.status,
            priority: this.priority,
            description: this.description,
        };
    }

    private convertTimestampToDate(timestamp: any): Date {
        return timestamp instanceof Date ? timestamp : new Date(timestamp.seconds * 1000);
      }
}