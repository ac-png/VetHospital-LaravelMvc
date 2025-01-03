export interface AppointmentType {
    date: string;
    reason: string;
    status: string;
    notes: string;
    user: string;
    patient: string;
    veterinarian: string;
    hospital: string;
}

export interface AppointmentTypeID extends AppointmentType {
    _id: string;
}

export interface IAuthContext {
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}
export type IResponseType = PatientTypeID