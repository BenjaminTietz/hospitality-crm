export class Tasks {
    property: string;
    status: string;
    priority: string;
    description: string;
  
    constructor(obj?: any) {
      this.property = obj ? obj.property : '';
      this.status = obj ? obj.status : '';
      this.priority = obj ? obj.priority : '';
      this.description = obj ? obj.description : '';
    }
  
    public toJSON() {
      return {
        property: this.property,
        status: this.status,
        priority: this.priority,
        description: this.description,
      };
    }
  }