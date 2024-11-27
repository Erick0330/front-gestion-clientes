import { Image } from "./image";

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image?: Image;
}
