import { useSession } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import VeterinarianItem from '@/components/VeterinarianItem';

export default function Tab() {
    const { session } = useSession();
    const [veterinarians, setVeterinarians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session) {
            axios.get('http://localhost:5001/api/veterinarians', {
                headers: {
                    Authorization: `Bearer ${session}`,
                },
            })
            .then(response => {
                setVeterinarians(response.data);
                setLoading(false);
            })
            .catch(e => {
                setError('Failed to load veterinarians');
                setLoading(false);
            });
        } else {
            setError('User not authenticated');
            setLoading(false);
        }
    }, [session]);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>{error}</Text>;
    if (veterinarians.length === 0) return <Text>No veterinarians found</Text>;

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={veterinarians}
                    renderItem={({ item }) => <VeterinarianItem veterinarian={item} />}
                    keyExtractor={(veterinarian) => veterinarian._id || veterinarian.someOtherUniqueId}
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
