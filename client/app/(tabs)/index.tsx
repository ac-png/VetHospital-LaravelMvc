import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useSession } from '@/contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function Tab() {
    const { session } = useSession();
    const navigation = useNavigation();
    
    return (
        <View style={{ flex: 1 }}>            
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                <Text variant="headlineLarge" style={{ marginBottom: 20 }}>
                    Welcome to the Animal Care Database
                </Text>
                {session ? (
                    <Button 
                        mode="text" 
                        onPress={() => navigation.navigate('appointments/index')}
                    >
                        Go to Appointments to View Your Appointments
                    </Button>
                ) : (
                    <Button 
                        mode="text" 
                        onPress={() => navigation.navigate('settings')}
                    >
                        Go to Settings to Sign In
                    </Button>
                )}
            </View>
        </View>
    );
}