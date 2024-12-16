import { View, Text, StyleSheet, Button, Image } from 'react-native';
import LoginForm from '@/components/LoginForm';
import { useSession } from '@/contexts/AuthContext';

export default function Tab() {
    const { session, signOut } = useSession();
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {(session) ? (
                    <>
                        <Text style={styles.title}>Animal Care Database</Text>
                        <Button 
                            onPress={signOut}
                            title="Logout"
                            color="#ff0000"
                        />
                    </>
                ) : (
                    <LoginForm />
                )}
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
        color: '#4CAF50',
        marginBottom: 50,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
});