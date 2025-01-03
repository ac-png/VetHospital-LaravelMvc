import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, TextInput, HelperText } from 'react-native-paper';
import axios from 'axios';
import { useSession } from '@/contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://localhost:5001/api';

export default function CreateAppointment() {
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const [patientId, setPatientId] = useState('');
    const [veterinarianId, setVeterinarianId] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const { session } = useSession();

    const isDateValid = (date) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(date);

    const handleSubmit = async () => {
        if (!date || !reason || !patientId || !veterinarianId || !hospitalId) {
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

            await axios.post(
                `${BASE_URL}/appointments`,
                {
                    date,
                    reason,
                    notes,
                    patient: patientId,
                    veterinarian: veterinarianId,
                    hospital: hospitalId,
                    user: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session}`,
                    },
                }
            );

            Alert.alert('Success', 'Appointment created successfully!');
            setDate('');
            setReason('');
            setNotes('');
            setPatientId('');
            setVeterinarianId('');
            setHospitalId('');
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || 'Failed to create the appointment.';
            Alert.alert('Error', message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create Appointment</Text>
            <TextInput
                label="Date (YYYY-MM-DDTHH:mm:ss)"
                value={date}
                onChangeText={setDate}
                style={styles.input}
                mode="outlined"
            />
            <HelperText type="error" visible={!isDateValid(date) && date.length > 0}>
                Please use the correct date format: YYYY-MM-DDTHH:mm:ss
            </HelperText>
            <TextInput
                label="Reason"
                value={reason}
                onChangeText={setReason}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Notes (Optional)"
                value={notes}
                onChangeText={setNotes}
                style={styles.input}
                mode="outlined"
                multiline
            />
            <TextInput
                label="Patient ID"
                value={patientId}
                onChangeText={setPatientId}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Veterinarian ID"
                value={veterinarianId}
                onChangeText={setVeterinarianId}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Hospital ID"
                value={hospitalId}
                onChangeText={setHospitalId}
                style={styles.input}
                mode="outlined"
            />
            <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
                labelStyle={styles.buttonLabel}
            >
                Create Appointment
            </Button>
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
    input: {
        marginBottom: 10,
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
