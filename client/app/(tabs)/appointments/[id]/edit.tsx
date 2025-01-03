import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { useSession } from '@/contexts/AuthContext';
import { useLocalSearchParams } from 'expo-router';
import { AppointmentType } from '@/types';

export default function EditAppointment() {
    const [appointment, setAppointment] = useState<AppointmentType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatedAppointment, setUpdatedAppointment] = useState<AppointmentType | null>(null);

    const { session } = useSession();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/appointments/${id}`, {
                    headers: {
                        Authorization: `Bearer ${session}`,
                    },
                });
                setAppointment(response.data);
                setUpdatedAppointment(response.data);
            } catch (err) {
                setError('Failed to load appointment');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [id, session]);

    const handleUpdate = async () => {
        if (updatedAppointment) {
            try {
                await axios.put(`http://localhost:5001/api/appointments/${id}`, updatedAppointment, {
                    headers: {
                        Authorization: `Bearer ${session}`,
                    },
                });
                Alert.alert('Success', 'Appointment has been updated.');
            } catch (err) {
                Alert.alert('Error', 'Failed to update the appointment.');
                console.error(err);
            }
        }
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
            <Text style={styles.heading}>Edit Appointment</Text>
            <View style={styles.formContainer}>
                <TextInput
                    label="Reason"
                    value={updatedAppointment.reason}
                    onChangeText={(text) => setUpdatedAppointment((prev) => ({ ...prev, reason: text }))}
                    style={styles.input}
                />
                <TextInput
                    label="Status"
                    value={updatedAppointment.status}
                    onChangeText={(text) => setUpdatedAppointment((prev) => ({ ...prev, status: text }))}
                    style={styles.input}
                />
                <TextInput
                    label="Notes"
                    value={updatedAppointment.notes || ''}
                    onChangeText={(text) => setUpdatedAppointment((prev) => ({ ...prev, notes: text }))}
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                />
                <Button mode="contained" onPress={handleUpdate} style={styles.updateButton}>
                    Update Appointment
                </Button>
            </View>
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
    formContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    input: {
        marginBottom: 16,
    },
    updateButton: {
        marginTop: 20,
        width: '100%',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
    },
});
