/**
 * Interface to define the structure of a User document.
 * It extends the Mongoose Document interface.
 */

export interface tsUser extends Document {
  user_id: number;
  name: string;
  email: string;
  phone: number;
  password: string;
}
