import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions, Text, TouchableOpacity } from "react-native";
import SignIn from "./login/signIn";
import SignUp from "./login/signUp";


export default function LoginUI() {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const { width, height } = useWindowDimensions();
    
    // Scale blobs based on screen size
    const blobSize = Math.min(width, height) * 0.9;

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-white"
        >
            {/* Top Blob Design */}
            <View 
                className="absolute bg-amber-400 rounded-full opacity-80" 
                style={{ 
                    width: blobSize, 
                    height: blobSize, 
                    top: -blobSize * 0.2, 
                    right: -blobSize * 0.25,
                    transform: [{ rotate: '15deg' }] 
                }}
            />
            
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1, paddingHorizontal: width > 600 ? width * 0.2 : 24, paddingVertical: 24 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 justify-center">
                    {mode === 'login' ? (
                        <SignIn onSignUpPress={() => setMode('signup')} />
                    ) : (
                        <SignUp onSignInPress={() => setMode('login')} />
                    )}
                </View>
            </ScrollView>

            {/* Bottom Navigation Link */}
            <View className="pb-10 items-center z-10">
                <TouchableOpacity 
                    onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    activeOpacity={0.7}
                >
                    <Text className="text-black font-bold text-sm text-center">
                        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <Text className="text-amber-500 font-bold">
                            {mode === 'login' ? 'Sign up' : 'Login'}
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Blob Design */}
            <View 
                className="absolute bg-amber-400 rounded-full opacity-80" 
                style={{ 
                    width: blobSize, 
                    height: blobSize, 
                    bottom: -blobSize * 0.3, 
                    left: -blobSize * 0.3,
                    transform: [{ rotate: '45deg' }],
                    zIndex: -1
                }}
            />
        </KeyboardAvoidingView>
    );
}
