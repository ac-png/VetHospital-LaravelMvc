import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import LoginForm from '@/components/LoginForm';
import { useSession } from '@/contexts/AuthContext';

export default function Tab() {
    const { session, signOut } = useSession();
    
    return (
        <View style={{ flex: 1 }}>            
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                <Text variant="headlineLarge" style={{ marginBottom: 20 }}>
                    Welcome to the Animal Care Database
                </Text>
                {session ? (
                    <Button 
                        mode="contained"
                        onPress={signOut}
                        style={{ marginTop: 10 }}
                    >
                        Logout
                    </Button>
                ) : (
                    <LoginForm />
                )}
            </View>
        </View>
    );
}