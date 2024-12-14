import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { PatientType } from '@/types'; // Ensure PatientType matches your schema

interface MyProps {
    patient: PatientType;
}

export default function PatientItem({ patient }: MyProps) {
    return (
        <View style={styles.item}>
            <Text style={styles.patientName}>{patient.name}</Text> 
            <Text style={styles.patientDetails}>
                {patient.type}
            </Text>
            <Text style={styles.patientDetails}>
                {patient.age} years old
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
    patientName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    patientDetails: {
        fontSize: 14,
        color: '#666',
    }
});
