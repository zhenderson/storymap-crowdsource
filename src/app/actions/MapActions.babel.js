import lang from 'dojo/_base/lang';
import AppStore from 'babel/store/AppStore';
import {
  UPDATE_MAP_REFERENCES,
  UPDATE_MAP_FEATURES_IN_EXTENT,
  UPDATE_MAP_SELECTED_FEATURES,
  UPDATE_MAP_HIGHLIGHTED_FEATURES
} from 'babel/constants/actionsTypes/Map';

const dispatch = AppStore.dispatch;

export const updateMapReferences = function (references) {
  return {
    type: UPDATE_MAP_REFERENCES,
    references
  };
};

export const updateFeaturesInExtent = function (features) {
  return {
    type: UPDATE_MAP_FEATURES_IN_EXTENT,
    features
  };
};

export const selectFeature = function (id) {
  return {
    type: UPDATE_MAP_SELECTED_FEATURES,
    id
  };
};

export const highlightFeature = function (id) {
  return {
    type: UPDATE_MAP_HIGHLIGHTED_FEATURES,
    id
  };
};

export const nextFeature = function () {
  const appState = AppStore.getState();
  const oidField = lang.getObject('app.map.layer.objectIdField',false,appState);
  const currentId = lang.getObject('app.map.selectedFeatureId',false,appState);
  const featuresInExtent = lang.getObject('app.map.featuresInExtent',false,appState);
  let currentIndex;

  featuresInExtent.forEach((current,index) => {
    if (current.attributes[oidField] === currentId) {
      currentIndex = index;
    }
  });

  let id = currentId;

  if ((currentIndex || currentIndex === 0) && currentIndex === featuresInExtent.length - 1) {
    id = featuresInExtent[0].attributes[oidField];
  } else if (currentIndex || (currentIndex === 0 && featuresInExtent.length > 1)) {
    id = featuresInExtent[currentIndex + 1].attributes[oidField];
  }

  return {
    type: UPDATE_MAP_SELECTED_FEATURES,
    id
  };
};

export const previousFeature = function () {
  const appState = AppStore.getState();
  const oidField = lang.getObject('app.map.layer.objectIdField',false,appState);
  const currentId = lang.getObject('app.map.selectedFeatureId',false,appState);
  const featuresInExtent = lang.getObject('app.map.featuresInExtent',false,appState);
  let currentIndex;

  featuresInExtent.forEach((current,index) => {
    if (current.attributes[oidField] === currentId) {
      currentIndex = index;
    }
  });

  let id = currentId;

  if (currentIndex === 0) {
    id = featuresInExtent[featuresInExtent.length - 1].attributes[oidField];
  } else if (currentIndex) {
    id = featuresInExtent[currentIndex - 1].attributes[oidField];
  }

  return {
    type: UPDATE_MAP_SELECTED_FEATURES,
    id
  };
};

export const boundActions = {
  updateMapReferences: (references) => dispatch(updateMapReferences(references)),
  updateFeaturesInExtent: (features) => dispatch(updateFeaturesInExtent(features)),
  selectFeature: (features) => dispatch(selectFeature(features)),
  highlightFeature: (features) => dispatch(highlightFeature(features)),
  nextFeature: () => dispatch(nextFeature()),
  previousFeature: () => dispatch(previousFeature())
};

export default boundActions;
