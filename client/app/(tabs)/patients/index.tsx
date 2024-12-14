import { useSession } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import PatientItem from '@/components/PatientItem';

export default function Tab() {
    const { session } = useSession();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session) {
            axios.get('http://localhost:5001/api/patients', {
                headers: {
                    Authorization: `Bearer ${session}`,
                },
            })
            .then(response => {
                setPatients(response.data);
                setLoading(false);
            })
            .catch(e => {
                setError('Failed to load patients');
                setLoading(false);
            });
        } else {
            setError('User not authenticated');
            setLoading(false);
        }
    }, [session]);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>{error}</Text>;
    if (patients.length === 0) return <Text>No patients found</Text>;

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={patients}
                    renderItem={({ item }) => <PatientItem patient={item} />}
                    keyExtractor={(patient) => patient._id || patient.someOtherUniqueId}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});
