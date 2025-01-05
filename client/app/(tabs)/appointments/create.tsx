import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, TextInput, HelperText, Menu, Provider, Surface, MD3LightTheme } from 'react-native-paper';
import axios from 'axios';
import { useSession } from '@/contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://localhost:5001/api';

export default function CreateAppointment() {
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const [patient, setPatient] = useState(null);
    const [veterinarian, setVeterinarian] = useState(null);
    const [hospital, setHospital] = useState(null);
    const [patients, setPatients] = useState([]);
    const [veterinarians, setVeterinarians] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [patientMenuVisible, setPatientMenuVisible] = useState(false);
    const [veterinarianMenuVisible, setVeterinarianMenuVisible] = useState(false);
    const [hospitalMenuVisible, setHospitalMenuVisible] = useState(false);

    const { session } = useSession();

    const isDateValid = (date) => !!Date.parse(date);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${session}`,
                };
    
                const [patientsRes, veterinariansRes, hospitalsRes] = await Promise.all([
                    axios.get(`${BASE_URL}/entities/patients`, { headers }),
                    axios.get(`${BASE_URL}/entities/veterinarians`, { headers }),
                    axios.get(`${BASE_URL}/entities/hospitals`, { headers }),
                ]);
    
                setPatients(patientsRes.data);
                setVeterinarians(veterinariansRes.data);
                setHospitals(hospitalsRes.data);
            } catch (err) {
                console.error('Error fetching data', err);
                Alert.alert('Error', 'Failed to load entities data.');
            }
        };
    
        if (session) {
            fetchData();
        }
    }, [session]);

    const handleSubmit = async () => {
        if (!date || !reason || !patient || !veterinarian || !hospital) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        if (!isDateValid(date)) {
            Alert.alert('Error', 'Date format is invalid. Use YYYY-MM-DDTHH:mm:ss.');
            return;
        }

        try {
            const decodedToken = jwtDecode(session);
            const userId = decodedToken._id;

            const headers = {
                Authorization: `Bearer ${session}`,
            };

            await axios.post(
                `${BASE_URL}/appointments`,
                {
                    date,
                    reason,
                    notes,
                    patient: patient._id,
                    veterinarian: veterinarian._id,
                    hospital: hospital._id,
                    user: userId,
                },
                {
                    headers,
                }
            );

            Alert.alert('Success', 'Appointment created successfully!');
            setDate('');
            setReason('');
            setNotes('');
            setPatient(null);
            setVeterinarian(null);
            setHospital(null);
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || 'Failed to create the appointment.';
            Alert.alert('Error', message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create Appointment</Text>
            <Surface style={styles.formContainer}>
                <TextInput
                    label="Date (YYYY-MM-DDTHH:mm:ss)"
                    value={date}
                    onChangeText={setDate}
                    style={styles.input}
                />
                <HelperText type="error" visible={!isDateValid(date) && date.length > 0}>
                    Please select a valid date.
                </HelperText>
                <TextInput
                    label="Reason"
                    value={reason}
                    onChangeText={setReason}
                    style={styles.input}
                />
                <TextInput
                    label="Notes"
                    value={notes}
                    onChangeText={setNotes}
                    style={styles.input}
                    multiline
                />
                <Menu
                    visible={patientMenuVisible}
                    onDismiss={() => setPatientMenuVisible(false)}
                    anchor={
                        <Button
                            mode="outlined"
                            onPress={() => setPatientMenuVisible(true)}
                            style={styles.selectButton}
                        >
                            {patient ? `${patient.name}` : 'Select Patient'}
                        </Button>
                    }
                >
                    {patients.map((patientItem) => (
                        <Menu.Item
                            key={patientItem._id}
                            onPress={() => { 
                                setPatient({ _id: patientItem._id, name: patientItem.name }); 
                                setPatientMenuVisible(false); 
                            }}
                            title={patientItem.name}
                        />
                    ))}
                </Menu>
                <Menu
                    visible={veterinarianMenuVisible}
                    onDismiss={() => setVeterinarianMenuVisible(false)}
                    anchor={
                        <Button
                            mode="outlined"
                            onPress={() => setVeterinarianMenuVisible(true)}
                            style={styles.selectButton}
                        >
                            {veterinarian ? `${veterinarian.name}` : 'Select Veterinarian'}
                        </Button>
                    }
                >
                    {veterinarians.map((vet) => (
                        <Menu.Item
                            key={vet._id}
                            onPress={() => { 
                                setVeterinarian({ _id: vet._id, name: vet.name }); 
                                setVeterinarianMenuVisible(false); 
                            }}
                            title={vet.name}
                        />
                    ))}
                </Menu>
                <Menu
                    visible={hospitalMenuVisible}
                    onDismiss={() => setHospitalMenuVisible(false)}
                    anchor={
                        <Button
                            mode="outlined"
                            onPress={() => setHospitalMenuVisible(true)}
                            style={styles.selectButton}
                        >
                            {hospital ? `${hospital.name}` : 'Select Hospital'}
                        </Button>
                    }
                >
                    {hospitals.map((hospitalItem) => (
                        <Menu.Item
                            key={hospitalItem._id}
                            onPress={() => { 
                                setHospital({ _id: hospitalItem._id, name: hospitalItem.name }); 
                                setHospitalMenuVisible(false); 
                            }}
                            title={hospitalItem.name}
                        />
                    ))}
                </Menu>
                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.submitButton}
                    labelStyle={styles.buttonLabel}
                >
                    Create Appointment
                </Button>
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    formContainer: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 3,
    },
    input: {
        marginBottom: 12,
    },
    selectButton: {
        marginBottom: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'transparent',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    submitButton: {
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#6200ee',
    },
    buttonLabel: {
        fontSize: 16,
        color: '#fff',
    },
});
