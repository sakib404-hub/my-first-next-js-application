export interface IUser {
  success : boolean;
  statusCode : number;
  message : string;
  data : {
    id : string;
    name : string;
    email : string; 
    activeStatus : string;
    role : string;
    createdAt : string;
    updatedAt : string;
    isPremium : boolean;
    profile : {
      id : string;
      profilePhoto : string;
      bio : string | null;
      userId : string;
      createdAt : string;
      updatedAt : string;
    }
  }
}

export interface NavbarProps {
  user : IUser
}