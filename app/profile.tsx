import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

import UserIcon from '@/assets/svg/userIcon';
import ProfilePhone from '@/assets/svg/profilePhone';
import ProfileEmail from '@/assets/svg/profileEmail';
import ProfileAddress from '@/assets/svg/profileAddress';
import ProfileEdit from '@/assets/svg/profileEdit';
import { useProfile } from '@/contexts/ProfileContext';

interface ProfileData {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  rewardPoints: number;
  loyaltyCnt: number; // number of cup in loyalty card
}

export default function Profile() {

  const [editField, setEditField] = useState<keyof ProfileData | null>(null);
  const [editValue, setEditValue] = useState("");
  const profileFilePath = FileSystem.documentDirectory + 'profile.txt';

  const { profile, setProfile } = useProfile();

  // Save profile data to file
  const saveProfileData = async (profileData: ProfileData) => {
    try {
      await FileSystem.writeAsStringAsync(
        profileFilePath, 
        JSON.stringify(profileData, null, 2)
      );
      console.log("Profile saved successfully");
    } catch (error) {
      console.error("Error saving profile data:", error);
      Alert.alert("Error", "Could not save profile data");
    }
  };

  // Start editing a field
    const handleEdit = (field: keyof ProfileData) => {
        if (field !== 'loyaltyCnt' && field !== 'rewardPoints') {
            setEditField(field);
            setEditValue(profile[field]);
        }
    };

  // Save edits
  const handleSave = async () => {
    if (editField) {
      const updatedProfile = { ...profile, [editField]: editValue };
      setProfile(updatedProfile);
      await saveProfileData(updatedProfile);
      setEditField(null);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditField(null);
  };

  // Render row with field data
  const renderProfileRow = (
    field: keyof ProfileData, 
    label: string, 
    Icon: React.ComponentType<any>
  ) => (
    <View style={styles.row}>
      <View style={styles.iconWrapper}>
        <Icon />
      </View>
     
      <View style={{flex: 1, marginHorizontal: 10}}>
        <Text style={styles.text}>{label}</Text>
        <Text style={styles.info}>{profile[field]}</Text>
      </View>
      <TouchableOpacity onPress={() => handleEdit(field)}>
        <ProfileEdit />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      
      {renderProfileRow("fullName", "Full name", UserIcon)}
      {renderProfileRow("phoneNumber", "Phone number", ProfilePhone)}
      {renderProfileRow("email", "Email", ProfileEmail)}
      {renderProfileRow("address", "Address", ProfileAddress)}

      {/* Edit Modal */}
      <Modal
        visible={editField !== null}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Edit {editField && editField.charAt(0).toUpperCase() + editField.slice(1).replace(/([A-Z])/g, ' $1')}
            </Text>
            
            <TextInput
              style={styles.textInput}
              value={editValue}
              onChangeText={setEditValue}
              multiline={editField === 'address'}
              numberOfLines={editField === 'address' ? 4 : 1}
            />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  header: {
    fontFamily: 'Poppins',
    color: '#001833',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 25,
  },
  text: {
    fontFamily: 'Poppins',
    color: '#AAAAAA',
    fontSize: 10,
    fontWeight: '500',
  },
  info: {
    fontFamily: 'Poppins',
    color: '#324A59',
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    backgroundColor: '#F7F8FB',
    borderRadius: 100,
    padding: 15,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#001833',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '48%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  saveButton: {
    backgroundColor: '#324A59',
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 14,
    color: '#324A59',
  },
  saveButtonText: {
    color: 'white',
  },
  iconWrapper: {
    width: 42, 
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8FB',
    borderRadius: 100,
    marginRight: 10,
  },
});