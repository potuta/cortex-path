import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react-native";

interface SignInProps {
    onSignUpPress: () => void;
}

export default function SignIn({ onSignUpPress }: SignInProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View className="flex-1 justify-center">
            <View className="mb-12">
                <Text className="text-black text-4xl font-bold">Login</Text>
                <Text className="text-gray-400 text-lg mt-1">Please sign in to continue.</Text>
            </View>

            <View className="gap-y-6">
                <View>
                    <View className="flex-row items-center border-b border-gray-200 pb-4 px-1">
                        <Mail color="#999" size={20} />
                        <View className="flex-1 ml-4">
                            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Email</Text>
                            <TextInput
                                className="text-black text-base font-semibold h-6 p-0"
                                placeholder="user123@email.com"
                                placeholderTextColor="#ccc"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                </View>

                <View>
                    <View className="flex-row items-center border-b border-gray-200 pb-4 px-1">
                        <Lock color="#999" size={20} />
                        <View className="flex-1 ml-4">
                            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Password</Text>
                            <TextInput
                                className="text-black text-base font-semibold h-6 p-0"
                                placeholder="••••••••"
                                placeholderTextColor="#ccc"
                                secureTextEntry={!isPasswordVisible}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            {isPasswordVisible ? (
                                <EyeOff color="#999" size={20} />
                            ) : (
                                <Eye color="#999" size={20} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity className="mt-2 self-end">
                        <Text className="text-amber-500 font-bold uppercase text-[10px]">Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <View className="items-end">
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        className="bg-amber-400 flex-row items-center px-10 py-4 rounded-full"
                        onPress={() => {}}
                    >
                        <Text className="text-white text-base font-bold uppercase tracking-widest mr-2">Login</Text>
                        <ArrowRight color="white" size={20} strokeWidth={3} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
