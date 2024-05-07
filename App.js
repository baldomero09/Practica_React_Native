import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false){
      alert("Permission to access camera is required");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true){
      return;
    }
    setSelectedImage({ localUri: pickerResult.assets[0].uri });
  };

  const openShareDialog = async () => {
    if(!(await Sharing.isAvailableAsync())){
      alert("Sharing is not available on your platform");
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <Text style={styles.title}>Not supported for platform :)</Text>
      ) : (
        <>
          <Text style={styles.title}>Pick an image</Text>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Image
              style={styles.image}
              source={{
                uri:
                  selectedImage !== null
                    ? selectedImage.localUri
                    : "https://picsum.photos/200/200",
              }}
            />
          </TouchableOpacity>
        </>
      )}
      { selectedImage ? (
        <TouchableOpacity onPress={openShareDialog} style={styles.button}>
          <Text style={styles.buttonText}>Share this image</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#515A5A"
  },
  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold"
  }
});