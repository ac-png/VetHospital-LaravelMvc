import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useSession } from '@/contexts/AuthContext';

export default function SettingsPage() {
    const { session } = useSession();

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ alignItems: 'center' }}>
                <Text variant="headlineSmall" style={{ marginBottom: 20 }}>
                    Settings
                </Text>
                {session ? (
                    <Text variant="bodyLarge" style={{ marginBottom: 10 }}>
                        Welcome to the settings page!
                    </Text>
                ) : (
                    <Text variant="bodyLarge" style={{ marginTop: 20 }}>
                        Please log in to access your settings.
                    </Text>
                )}
            </View>
        </View>
    );
}
