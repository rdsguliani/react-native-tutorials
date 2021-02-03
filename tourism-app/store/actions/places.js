import * as FileSystem from "expo-file-system";
import { insertPlace, getPlaces } from "../../data/db";
import Place from "../../models/Place";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image) => {
  console.log(title, image);
  return async (dispatch) => {
    const newPath = FileSystem.documentDirectory + image.split("/").pop();
    try {
      const result = await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbResult = await insertPlace(
        title,
        newPath,
        "dummy address",
        15.6,
        12.3
      );
      const id = dbResult.insertId.toString();
      dispatch({
        type: ADD_PLACE,
        placeData: { id, title, image: newPath },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const fetchPlaces = () => {
  return async (dispatch) => {
    try {
      const result = await getPlaces();

      const places = result.rows._array.map(
        (place) => new Place(place.id.toString(), place.title, place.image)
      );

      dispatch({ type: SET_PLACES, places });
    } catch (e) {
      console.log(e);
    }
  };
};
