import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

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
                name='appointments/index'
                options={{
                    title: 'Appointments',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
                }}
            />
            <Tabs.Screen
                name = 'settings'
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
            <Tabs.Screen 
                name='appointments/[id]/index'
                options={{
                    title: 'Appointment Details',
                    href: null
                }}
            />
            <Tabs.Screen 
                name='appointments/create'
                options={{
                    title: 'Create Appointment',
                    href: null
                }}
            />  
        </Tabs>
    );
}