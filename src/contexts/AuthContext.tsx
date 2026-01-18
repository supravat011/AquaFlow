import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
    user: User | null;
    login: (role: UserRole) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Mock user data generator
const getMockUser = (role: UserRole): User => {
    switch (role) {
        case UserRole.ADMIN:
            return {
                id: 'admin-1',
                name: 'System Administrator',
                email: 'admin@aquaflow.com',
                role: UserRole.ADMIN,
                avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
            };
        case UserRole.STAFF:
            return {
                id: 'staff-1',
                name: 'Field Technician',
                email: 'staff@aquaflow.com',
                role: UserRole.STAFF,
                avatar: 'https://ui-avatars.com/api/?name=Staff+Member&background=4F46E5&color=fff'
            };
        case UserRole.CONSUMER:
        default:
            return {
                id: 'user-1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: UserRole.CONSUMER,
                avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=10B981&color=fff'
            };
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('aquaflow_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (role: UserRole) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockUser = getMockUser(role);
        setUser(mockUser);
        localStorage.setItem('aquaflow_user', JSON.stringify(mockUser));
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('aquaflow_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isLoading,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};
