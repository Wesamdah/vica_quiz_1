export interface LoginData {
  email: string;
  password: string;
}

export interface SigupData {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  profile_image: Blob | null;
}
