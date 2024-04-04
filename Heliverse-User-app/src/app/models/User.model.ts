export class User {
    id: number;
    first_name: string;
    last_name: string;
    domain: string;
    gender: string;
    available: boolean;
    selected: boolean;
    avatar: string; 
  
    constructor(id: number, first_name: string, last_name: string, domain: string, gender: string, available: boolean, selected: boolean, avatar: string) {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.domain = domain;
      this.gender = gender;
      this.available = available;
      this.selected = selected;
      this.avatar = avatar; 
    }
  
    get name(): string {
      return `${this.first_name} ${this.last_name}`;
    }
  }