import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { VeterinarianType } from '@/types'; // Ensure VeterinarianType matches your schema

interface MyProps {
    veterinarian: VeterinarianType;
}

export default function VeterinarianItem({ veterinarian }: MyProps) {
    return (
        <View style={styles.item}>
            <Text style={styles.veterinarianName}>{veterinarian.name}</Text> 
            <Text style={styles.veterinarianDetails}>
                {veterinarian.address}
            </Text>
            <Text style={styles.veterinarianDetails}>
                {veterinarian.bio}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eaeaea',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    veterinarianName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    veterinarianDetails: {
        fontSize: 14,
        color: '#666',
    }
});
