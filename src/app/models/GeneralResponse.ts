import { UserData } from './UserData';

export class GeneralResponse {
    StatusCode: number;
    Message: string;
    JWTToken: string;
    Data: any;
}