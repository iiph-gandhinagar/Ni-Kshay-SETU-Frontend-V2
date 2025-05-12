export interface User {
  address: []; // You might want to specify a more specific type for address
  age: number;
  bank: []; // Similarly, specify a more specific type for bank
  birthDate: string;
  bloodGroup: string;
  company: []; // Specify a more specific type for company
  crypto: []; // Specify a more specific type for crypto
  ein: string;
  email: string;
  eyeColor: string;
  firstName: string;
  gender: string;
  hair: []; // Specify a more specific type for hair
  height: number;
  id: number;
  image: string;
  ip: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
}

export interface UserResponsePayload {
  limit: number;
  skip: number;
  total: number;
  users: User[];
}

export interface DataItem {
  name: string;
}

export interface Data {
  data: DataItem[];
}
type UnauthorizedError = {
  Unauthorized: 'Unauthorized';
};

export type UnauthorizedResponsePayload = {
  errors: UnauthorizedError[];
};

export interface UserLoginResponsePayload {
  code: number;
  data: [
    {
      HealthFacility: string;
      access_token: string;
      block: string;
      cadre: string;
      cadreType: string;
      country: string;
      district: string;
      name: string;
      phoneNo: string;
      state: string;
    }
  ];
  message: string;
  status: boolean;
}

export interface SagaError {
  code: number;
  message: string;
}
