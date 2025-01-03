import { useState, useEffect } from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI';
import { Link } from 'expo-router';
import { Card, Title, Paragraph } from 'react-native-paper';

export default function AppointmentsPage() {
    const { session } = useSession();
    const [appointments, setAppointments] = useState([]);

    const { getRequest, loading, error } = useAPI();

    useEffect(() => {
        if (!session) {
            return;
        }

        getRequest('http://localhost:5001/api/appointments', {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        }, (data) => {
            setAppointments(data);
        });
    }, [session]);

    if (loading) return <Text>Loading appointments...</Text>;

    if (error) return <Text style={styles.errorText}>Failed to load appointments: {error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Appointments</Text>

            <FlatList
                data={appointments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title>{item.reason}</Title>
                            <Paragraph style={styles.dateText}>
                                {new Date(item.date).toLocaleString()}
                            </Paragraph>
                            <Paragraph style={styles.statusText}>
                                <Text>Status: </Text>
                                <Text style={styles.status}>{item.status}</Text>
                            </Paragraph>
                        </Card.Content>
                        <Card.Actions>
                        <Link href={{
                                pathname: '/appointments/[id]',
                                params: { id: item._id }
                            }}><Text>View Details</Text></Link>
                        </Card.Actions>
                    </Card>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    createButton: {
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: '#01ff00',
    },
    progressBar: {
        marginTop: 20,
    },
    card: {
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.1,
    },
    dateText: {
        fontSize: 14,
        color: '#888',
        marginVertical: 5,
    },
    statusText: {
        fontSize: 14,
        color: '#888',
        marginVertical: 5,
    },
    status: {
        fontWeight: 'bold',
        color: '#00796b',
    },
    button: {
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    noAppointmentsText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        marginTop: 20,
    },
});
