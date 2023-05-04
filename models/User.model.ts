export interface User {
    name: string;
    age: number;
    email: string;
  }
  
  export interface Employee extends User {
    id: number;
    
  }