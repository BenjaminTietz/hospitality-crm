export class Properties {
    name: string;
    price: number;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';                     //if else statement if obj exists then obj.fistName else empty string
        this.price = obj ? obj.price : '';
    }

    public toJSON() {
        return {
            name: this.name,
            price: this.price,
        };
    }
}