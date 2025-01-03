import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, ActivityIndicator, Avatar, List, Button } from 'react-native-paper';
import { useSession } from '@/contexts/AuthContext';
import useAPI from '@/hooks/useAPI';
import LoginForm from '../../components/LoginForm';

export default function SettingsPage() {
    const { session, signOut } = useSession();
    const [profile, setProfile] = useState(null);

    const { getRequest, loading, error } = useAPI();

    useEffect(() => {
        if (!session) {
            return;
        }

        getRequest('http://localhost:5001/api/auth/profile', {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        }, (data) => {
            setProfile(data);
        });
    }, [session]);

    if (!session) {
        return <LoginForm />; // Render the LoginForm if not logged in
    }

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator animating={true} size="large" />
                <Text>Loading profile...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Error loading profile</Text>
            </View>
        );
    }

    if (!profile) {
        return (
            <View style={styles.centered}>
                <Text>No profile data available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.header}>Settings</Text>

            <Card style={styles.card}>
                <Card.Title 
                    title="Profile Info"
                    subtitle={`Welcome, ${profile.username}`}
                    left={() => <Avatar.Text label={profile.username.charAt(0)} size={40} />}
                />
                <Card.Content>
                    <List.Section>
                        <List.Item
                            title="Username"
                            description={profile.username}
                            left={() => <List.Icon icon="account" />}
                        />
                        <List.Item
                            title="Email"
                            description={profile.email}
                            left={() => <List.Icon icon="email" />}
                        />
                        <List.Item
                            title="Role"
                            description={profile.role.name}
                            left={() => <List.Icon icon="account-group" />}
                        />
                    </List.Section>
                </Card.Content>
            </Card>

            <Button mode="contained" onPress={signOut} style={styles.logoutButton}>
                Log Out
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        marginBottom: 20,
    },
    logoutButton: {
        marginTop: 20,
        alignSelf: 'center',
    },
});
