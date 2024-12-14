import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { HospitalType } from '@/types'; // Ensure HospitalType matches your schema

interface MyProps {
    hospital: HospitalType;
}

export default function HospitalItem({ hospital }: MyProps) {
    return (
        <View style={styles.item}>
            <Text style={styles.hospitalName}>{hospital.name}</Text> 
            <Text style={styles.hospitalDetails}>
                {hospital.address}
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
    hospitalName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    hospitalDetails: {
        fontSize: 14,
        color: '#666',
    }
});
