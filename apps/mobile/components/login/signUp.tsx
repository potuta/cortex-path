import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Mail, Lock, User, ArrowRight, ChevronLeft, Eye, EyeOff } from "lucide-react-native";

interface SignUpProps {
    onSignInPress: () => void;
}

export default function SignUp({ onSignInPress }: SignUpProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    return (
        <View className="flex-1 justify-center">
            <TouchableOpacity 
                onPress={onSignInPress} 
                className="mb-16 self-start "
            >
                <ChevronLeft color="#666" size={28} />
            </TouchableOpacity>

            <View className="mb-12">
                <Text className="text-black text-4xl font-bold">Create Account</Text>
            </View>

            <View className="gap-y-6">
                <View>
                    <View className="flex-row items-center border-b border-gray-200 pb-4 px-1">
                        <User color="#999" size={20} />
                        <View className="flex-1 ml-4">
                            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Username</Text>
                            <TextInput
                                className="text-black text-base font-semibold h-6 p-0"
                                placeholder="Enter your username"
                                placeholderTextColor="#ccc"
                            />
                        </View>
                    </View>
                </View>

                <View>
                    <View className="flex-row items-center border-b border-gray-200 pb-4 px-1">
                        <Mail color="#999" size={20} />
                        <View className="flex-1 ml-4">
                            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Email</Text>
                            <TextInput
                                className="text-black text-base font-semibold h-6 p-0"
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
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
                </View>

                <View>
                    <View className="flex-row items-center border-b border-gray-200 pb-4 px-1">
                        <Lock color="#999" size={20} />
                        <View className="flex-1 ml-4">
                            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Confirm Password</Text>
                            <TextInput
                                className="text-black text-base font-semibold h-6 p-0"
                                placeholder="Confirm your password"
                                placeholderTextColor="#ccc"
                                secureTextEntry={!isConfirmPasswordVisible}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                            {isConfirmPasswordVisible ? (
                                <EyeOff color="#999" size={20} />
                            ) : (
                                <Eye color="#999" size={20} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className="items-end mt-12">
                <TouchableOpacity 
                    activeOpacity={0.8}
                    className="bg-amber-400 flex-row items-center px-10 py-4 rounded-full"
                    onPress={() => {}}
                >
                    <Text className="text-white text-base font-bold uppercase tracking-widest mr-2">Sign Up</Text>
                    <ArrowRight color="white" size={20} strokeWidth={3} />
                </TouchableOpacity>
            </View>

        </View>
    );
}
