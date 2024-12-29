export interface UserDetail {
  userId: string;
  username: string;
  password: string;
  email: string;
  fullname: string;
  dob: Date;
  address: string;
  phoneNumber: number;
  role: string;
  status: boolean;
  userCreatedAt: Date;
  userImage: string;
  userOffenseCount: number;
  userLevel: string;
}

export interface UpdateRole {
  username: string;
  password: string;
  email: string;
  fullname: string;
  dob: Date;
  address: string;
  phoneNumber: number;
  role: string | null;
  status: boolean;
  userCreatedAt: Date;
  userImage: string;
}
export interface Profile {
  userId: string;
  username: string;
  password: string;
  email: string;
  fullname: string;
  dob: Date;
  address: string;
  phoneNumber: number;
  role: string;
  status: boolean;
  userCreatedAt: Date;
  userImage: string;
  userLevel: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface resetPasswordInput {
  email: string;
  resetCode: string;
  newPassword: string;
}

export interface bankInformation {
  id: string;
  name: string;
  code: string;
  bin: number;
  short_name: string;
  logo_url: string;
  icon_url: string;
  swift_code: string;
  lookup_supported: number;
}
