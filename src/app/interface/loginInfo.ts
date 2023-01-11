import { User } from './user';
export interface LoginInfo {
    userInfo: User;
    isAuthenticated: boolean;
}