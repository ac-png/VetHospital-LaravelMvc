import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { AppointmentType, PatientType, VeterinarianType, HospitalType } from '@/types';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Tab() {
    const navigation = useNavigation();
    const [appointment, setAppointment] = useState<AppointmentType | null>(null);
    const [patient, setPatient] = useState<PatientType | null>(null);
    const [veterinarian, setVeterinarian] = useState<VeterinarianType | null>(null);
    const [hospital, setHospital] = useState<HospitalType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    const { session } = useSession();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${session}`,
                    },
                });
                setRole(response.data.role.name);
            } catch (err) {
                console.error('Error fetching user role', err);
            }
        };

        const fetchAppointment = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/appointments/${id}`, {
                    headers: {
                        Authorization: `Bearer ${session}`,
                    },
                });
                setAppointment(response.data);
                await fetchRelatedData(response.data);
            } catch (err: any) {
                setError('Failed to load appointment');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchRelatedData = async (appointmentData: AppointmentType) => {
            try {
                if (appointmentData.patient?.id) {
                    const patientResponse = await axios.get(`http://localhost:5001/api/patients/${appointmentData.patient.id}`, {
                        headers: {
                            Authorization: `Bearer ${session}`,
                        },
                    });
                    setPatient(patientResponse.data);
                }

                if (appointmentData.veterinarian?.id) {
                    const vetResponse = await axios.get(`http://localhost:5001/api/veterinarians/${appointmentData.veterinarian.id}`, {
                        headers: {
                            Authorization: `Bearer ${session}`,
                        },
                    });
                    setVeterinarian(vetResponse.data);
                }

                if (appointmentData.hospital?.id) {
                    const hospitalResponse = await axios.get(`http://localhost:5001/api/hospitals/${appointmentData.hospital.id}`, {
                        headers: {
                            Authorization: `Bearer ${session}`,
                        },
                    });
                    setHospital(hospitalResponse.data);
                }
            } catch (err: any) {
                setError('Failed to load related data');
                console.error(err);
            }
        };

        fetchUserRole();
        fetchAppointment();
    }, [id, session]);

    const handleEdit = () => {
        console.log('Edit button clicked');
    };

    const handleDelete = () => {
        console.log('Delete button clicked');
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!appointment) {
        return (
            <View style={styles.container}>
                <Text>Appointment not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Appointment Details</Text>
            <View style={styles.card}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{new Date(appointment.date).toLocaleString()}</Text>

                <Text style={styles.label}>Reason:</Text>
                <Text style={styles.value}>{appointment.reason}</Text>

                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{appointment.status}</Text>

                <Text style={styles.label}>Notes:</Text>
                <Text style={styles.value}>{appointment.notes || 'No additional notes'}</Text>

                <Text style={styles.label}>Patient:</Text>
                <Text style={styles.value}>{appointment.patient.name || 'N/A'}</Text>

                <Text style={styles.label}>Veterinarian:</Text>
                <Text style={styles.value}>{appointment.veterinarian.name || 'N/A'}</Text>

                <Text style={styles.label}>Hospital:</Text>
                <Text style={styles.value}>{appointment.hospital.name || 'N/A'}</Text>
            </View>

            {(role === 'vet' || role === 'admin') && (
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={handleEdit} style={styles.button} icon="pencil">
                        Edit
                    </Button>
                    <Button mode="contained" onPress={handleDelete} style={[styles.button, styles.deleteButton]} icon="trash-can">
                        Delete
                    </Button>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 16,
    },
    card: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
    },
});
