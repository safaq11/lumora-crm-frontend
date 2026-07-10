export interface User {

  id?:number;

  username:string;

  fullName:string;

  password?: string;      

  email:string;

  mobile:string;

  role:string;

  profileImage?: string;

  createdDate?: string;

  lastLogin?: string;

  active: boolean;

}