import React, { createContext, useState, useContext, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

interface ProfileContextType {
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

// Đây là Provider bọc App hoặc screen component
import { ReactNode } from 'react';

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const fileUri = `${FileSystem.documentDirectory}profile.txt`;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        if (!fileInfo.exists) {
          console.log('File not found:', fileUri);
          return;
        }

        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        const data = JSON.parse(fileContent);

        //console.log('Profile loaded:', data);
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Hook dùng trong component
export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    console.warn('useProfile must be used inside a ProfileProvider');
    return { profile: null, setProfile: () => {} };
  }

  return context;
};
