import React, { useState } from "react";

import { View, Image, Text, StyleSheet, Button, Alert } from "react-native";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import Colors from "../constants/Colors";

const ImgPicker = (props) => {
  const [imageURI, setImageURI] = useState();

  const verifyPermissions = async () => {
    try {
      const result = await Permissions.askAsync(Permissions.CAMERA);
      if (result.status != "granted") {
        Alert.alert("Insufficient Permission", "Grant Camera Permissions", [
          { text: "Okay" },
        ]);
        return false;
      }
    } catch (e) {}
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (hasPermission) {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      setImageURI(image.uri);
      props.onImageTaken(image.uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!imageURI ? (
          <Text> No Image Picked yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: imageURI }} />
        )}
      </View>

      <Button
        title="Take Image"
        onPress={takeImageHandler}
        color={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
