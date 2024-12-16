import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { useSession } from '@/contexts/AuthContext';

export default function LoginForm() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const { signIn } = useSession();
    const [visible, setVisible] = useState(false);

    const handleChange = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const handlePress = () => {
        console.log("Clicked");

        axios.post('http://localhost:5001/api/auth/login', {
            email: form.email,
            password: form.password
        })
        .then(response => {
            console.log(response.data.token);
            signIn(response.data.token);
        })
        .catch(e => {
            console.log(e);

            if (e.response && e.response.data) {
                setError(e.response.data.message);
            } else if (e.message) {
                setError(e.message);
            } else {
                setError('An unknown error occurred');
            }

            setVisible(true);
        });
    };
    
    return (
        <View style={{ padding: 20 }}>
            <TextInput
                label="Email"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                style={{ marginBottom: 10 }}
                mode="outlined"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
                style={{ marginBottom: 20 }}
                secureTextEntry
                mode="outlined"
            />
            <Button 
                mode="contained"
                onPress={handlePress}
                style={{ marginBottom: 20 }}
            >
                Submit
            </Button>
            {error && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
            )}
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={3000}
            >
                {error}
            </Snackbar>
        </View>
    );
}
