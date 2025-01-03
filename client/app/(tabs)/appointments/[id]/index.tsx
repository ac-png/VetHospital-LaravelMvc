import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLocalSearchParams } from 'expo-router';

import { AppointmentType } from '@/types';

export default function Tab() {
    const [appointment, setAppointment] = useState<AppointmentType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        } catch (err: any) {
            setError('Failed to load appointment');
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchAppointment();
    }, [id]);

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
            <Text>{error}</Text>
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
        <Text style={styles.reason}>{appointment.reason}</Text>
        <Text style={styles.notes}>{appointment.notes}</Text>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    reason: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    notes: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    },
});
