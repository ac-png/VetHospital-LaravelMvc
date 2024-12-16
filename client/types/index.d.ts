export interface PatientType {
    _id?: string;
    name: string;
    age: number;
    type: string;
}
export interface PatientTypeID extends PatientType {
    _id: string;
}
export interface HospitalType {
    _id?: string;
    name: string;
    address: string;
}
export interface HospitalTypeID extends HospitalType {
    _id: string;
}
export interface VeterinarianType {
    _id?: string;
    name: string;
    address: string;
    bio: string;
}
export interface VeterinarianTypeID extends VeterinarianType {
    _id: string;
}
export interface IAuthContext {
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}
export type IResponseType = PatientTypeID