import { View, Text, StyleSheet, Image, Button } from 'react-native';
import React, { useState } from 'react';
import CameraComponent from '@/components/CameraComponent';

export default function SimpleProfile() {
  const [showCamera, setShowCamera] = useState(false);
  const [profileImage, setProfileImage] = useState(require('../../assets/images/kp.jpeg'));

  const handleTakePhoto = () => {
    setShowCamera(true);
  };

  const handlePhotoTaken = (photo) => {
    if (photo && photo.base64) {
      setProfileImage({ uri: `data:image/jpg;base64,${photo.base64}` });
      setShowCamera(false);
    }
  };

  if (showCamera) {
    return <CameraComponent onPhotoTaken={handlePhotoTaken} />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={profileImage}
        style={styles.avatar}
      />

      <Text style={styles.name}>karpagam Anand</Text>
      <Text style={styles.email}>kp@gmail.com</Text>
      <Text style={styles.bio}>
        Mobile Developer | Tech Enthusiast | Lifelong Learner
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title='Take Photo'
          color={'#800080'}
          onPress={handleTakePhoto}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#800080',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  bio: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '40%',
    padding: 20,
  }
});