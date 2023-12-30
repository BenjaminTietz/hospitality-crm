export class Properties {
    name: string;
    price: number;
    street: string;
    zipCode: number;
    city: string;
    country: string;
    amenities: string[];  
  
    constructor(obj?: any) {
      this.name = obj ? obj.name : '';
      this.price = obj ? obj.price : '';
      this.street = obj ? obj.street : '';
      this.zipCode = obj ? obj.zipCode : '';
      this.city = obj ? obj.city : '';
      this.country = obj ? obj.country : '';
      this.amenities = obj ? obj.amenities || [] : [];  
    }
  
    public toJSON() {
      return {
        name: this.name,
        price: this.price,
        street: this.street,
        zipCode: this.zipCode,
        city: this.city,
        country: this.country,
        amenities: this.amenities,  
      };
    }
  }
  