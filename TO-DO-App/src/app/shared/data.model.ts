export interface SignupRespose{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
}

export interface SignupRequest{
    email:string	
    password:string
    returnSecureToken:boolean;
}

export interface LoginRequest{
    email:string;
    password:string
    returnSecureToken:boolean;
}

export interface LoginResponse{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered:boolean;
}

export interface TodoItem{
    category:string; 
    desc:string; 
    dueDate:string; 
    owner:string; 
    reminderDate:string; 
    status:string; 
    title:string; 
    todoID:string; 
    isPublic:boolean;
}

export interface UserDetails{
    address:string; 
    email:string; 
    firstName:string; 
    gender:string; 
    lastName:string; 
    password:string; 
    userImage:string; 
    userName:string; 
}

export interface TodoObject{
    [s:string]:TodoItem
}