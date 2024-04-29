export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
  recipes: string[];
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  isModified: (path: string) => boolean;
}

export interface IRecipe extends Document {
  id: string;
  name: string;
  description: string;
  performingUser: IUser["_id"];
  instructions: string[];
  image: string;
}

export interface IMessage extends Document {
  performingUser: IUser["_id"];
  text: string;
  date: Date;
}

export interface IChat extends Document {
  messages: IMessage[];
}
