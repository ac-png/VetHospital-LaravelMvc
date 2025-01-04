import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { useNavigation } from 'expo-router';

function BackButton() {
    const navigation = useNavigation();

    return (
        <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
            iconColor="blue"
        />
    );
}

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="appointments/index"
                options={{
                    title: 'Appointments',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
                    headerLeft: () => <BackButton />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                    headerLeft: () => <BackButton />,
                }}
            />
            <Tabs.Screen
                name="appointments/[id]/index"
                options={{
                    title: 'Appointment Details',
                    href: null,
                    headerLeft: () => <BackButton />,
                }}
            />
            <Tabs.Screen
                name="appointments/create"
                options={{
                    title: 'Create Appointment',
                    href: null,
                    headerLeft: () => <BackButton />,
                }}
            />
            <Tabs.Screen
                name="appointments/[id]/edit"
                options={{
                    title: 'Edit Appointment',
                    href: null,
                    headerLeft: () => <BackButton />,
                }}
            />
        </Tabs>
    );
}
