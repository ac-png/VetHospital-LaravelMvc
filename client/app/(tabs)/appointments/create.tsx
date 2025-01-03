import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import axios from 'axios';
import { useSession } from '@/contexts/AuthContext';

export default function CreateAppointment() {
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const [patientId, setPatientId] = useState('');
    const [veterinarianId, setVeterinarianId] = useState('');
    const { session } = useSession();

    const handleSubmit = async () => {
        if (!date || !reason || !patientId || !veterinarianId) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        try {
            await axios.post(
                'http://localhost:5001/api/appointments',
                {
                    date,
                    reason,
                    notes,
                    patientId,
                    veterinarianId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session}`,
                    },
                }
            );

            Alert.alert('Success', 'Appointment created successfully!');
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Failed to create the appointment.');
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
        marginBottom: 15,
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
