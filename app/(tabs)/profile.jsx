import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function SimpleProfile() {
  return (
    <View style={styles.container}>
      <Image
        // source={{ uri: 'https://static.vecteezy.com/system/resources/previews/014/194/216/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg' }}
        source={require('../../assets/images/kp.jpeg')}
        style={styles.avatar}
      />

      <Text style={styles.name}>karpagam Anand</Text>
      <Text style={styles.email}>kp@gmail.com</Text>
      <Text style={styles.bio}>
        Mobile Developer | Tech Enthusiast | Lifelong Learner
      </Text>
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
});