import { View, Text, StyleSheet } from 'react-native';

export default function Appointments() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Appointments</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Arial',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    }
});