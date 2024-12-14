import { useSession } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import HospitalItem from '@/components/HospitalItem';

export default function Tab() {
    const { session } = useSession();
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session) {
            axios.get('http://localhost:5001/api/hospitals', {
                headers: {
                    Authorization: `Bearer ${session}`,
                },
            })
            .then(response => {
                setHospitals(response.data);
                setLoading(false);
            })
            .catch(e => {
                setError('Failed to load hospitals');
                setLoading(false);
            });
        } else {
            setError('User not authenticated');
            setLoading(false);
        }
    }, [session]);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>{error}</Text>;
    if (hospitals.length === 0) return <Text>No hospitals found</Text>;

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={hospitals}
                    renderItem={({ item }) => <HospitalItem hospital={item} />}
                    keyExtractor={(hospital) => hospital._id || hospital.someOtherUniqueId}
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
