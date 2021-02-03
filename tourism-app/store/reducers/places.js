import Place from "../../models/Place";

const { ADD_PLACE, SET_PLACES } = require("../actions/places");

const initialState = {
  places: [],
};

const placeReducer = (state = initialState, action) => {
  const type = action.type;

  switch (type) {
    case ADD_PLACE:
      const { id, title, image } = action.placeData;
      const place = new Place(id.toString(), title, image);

      return {
        ...state,
        places: state.places.concat(place),
      };

    case SET_PLACES:
      return {
        ...state,
        places: [...action.places],
      };

    default:
      return state;
  }

  return state;
};

export default placeReducer;
