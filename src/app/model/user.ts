export interface User {
    id: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    role: string;
    phone: string;
    avatar?: string; 
    userName?: string; 
    password: string;
    isRegistered?: boolean; 
    tokenOfRegisterConfirmation: string;
    tokenOfResetPassword: string;
    isDisabled?: boolean; 
    isDeleted?: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date; 
  }