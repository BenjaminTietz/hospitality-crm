export class Bookings {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    zipCode: number;
    city: string;
    checkIn: string;
    checkOut: string;
    appartment: string;
    duration: any;
    totalPrice: any;
  
    constructor(obj?: any) {
      this.firstName = obj ? obj.firstName : '';
      this.lastName = obj ? obj.lastName : '';
      this.email = obj ? obj.email : '';
      this.street = obj ? obj.street : '';
      this.zipCode = obj ? obj.zipCode : '';
      this.city = obj ? obj.city : '';
      this.checkIn = obj ? obj.checkIn : '';
      this.checkOut = obj ? obj.checkOut : '';
      this.appartment = obj ? obj.appartment : '';
      this.duration = obj ? obj.duration : null;  // Füge duration und totalPrice hinzu
      this.totalPrice = obj ? obj.totalPrice : null;
    }
  
    public toJSON() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        street: this.street,
        zipCode: this.zipCode,
        city: this.city,
        checkIn: this.checkIn,
        checkOut: this.checkOut,
        appartment: this.appartment,
        duration: this.duration,  // Füge duration und totalPrice hinzu
        totalPrice: this.totalPrice,
      };
    }
  }
  