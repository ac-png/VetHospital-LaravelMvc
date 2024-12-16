import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSession } from '@/contexts/AuthContext';

export default function Tab() {
    const { session } = useSession();
    
    return (
        <View style={{ flex: 1 }}>            
            <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                <Text variant="headlineSmall" style={{ margin: 20 }}>
                    Appointments
                </Text>
                {session ? (
                    <Text>
                        Welcome to the appointments page!
                    </Text>
                ) : (
                    <Text variant="bodyLarge" style={{ marginTop: 20 }}>
                        Please log in to access your appointments.
                    </Text>
                )}
            </View>
        </View>
    );
}