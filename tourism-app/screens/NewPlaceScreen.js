import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import ImgPicker from "../components/ImgPicker";

import Colors from "../constants/Colors";
import { addPlace } from "../store/actions/places";

const NewPlaceScreen = (props) => {
  const dispatch = useDispatch();

  const [titleValue, setTitleValue] = useState("");
  const [image, setImage] = useState();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const saveHandler = () => {
    dispatch(addPlace(titleValue, image));
    props.navigation.goBack();
  };

  const onImageTakenHandler = (uri) => {
    setImage(uri);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}> Title </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImgPicker onImageTaken={onImageTakenHandler} />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={saveHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Add Place",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
