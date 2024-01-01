import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface PlatformStateInterface {
  isSmallPhone: boolean;
  isPhone: boolean;
  isSmallTablet: boolean;
  isMediumTablet: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  [key: string]: boolean;
}

const initialState: PlatformStateInterface = {
  isSmallPhone: false,
  isPhone: false,
  isSmallTablet: false,
  isMediumTablet: false,
  isTablet: false,
  isLaptop: false,
  isDesktop: true,
  isLargeDesktop: false,
};

const updateScreenStates = (
  stateList: PlatformStateInterface,
  updateValue: boolean,
  updateKeyList: string[]
) => {
  Object.keys(stateList).forEach((stateKey) => {
    stateList[stateKey] = updateKeyList.includes(stateKey)
      ? updateValue
      : !updateValue;
  });
};

const platformSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {
    setIsSmallPhone: (state, action) => {
      updateScreenStates(state, action.payload, ["isSmallPhone", "isPhone"]);
    },
    setIsPhone: (state, action) => {
      updateScreenStates(state, action.payload, ["isPhone"]);
    },
    setIsSmallTablet: (state, action) => {
      updateScreenStates(state, action.payload, [
        "isSmallTablet",
        "isMediumTablet",
        "isTablet",
      ]);
    },
    setIsMediumTablet: (state, action) => {
      updateScreenStates(state, action.payload, ["isMediumTablet", "isTablet"]);
    },
    setIsTablet: (state, action) => {
      updateScreenStates(state, action.payload, ["isTablet"]);
    },
    setIsLaptop: (state, action) => {
      updateScreenStates(state, action.payload, ["isLaptop", "isDesktop"]);
    },
    setIsDesktop: (state, action) => {
      updateScreenStates(state, action.payload, ["isDesktop"]);
    },
    setIsLargeDesktopScreen: (state, action) => {
      updateScreenStates(state, action.payload, [
        "isDesktop",
        "isLargeDesktop",
      ]);
    },
  },
});

// NOTE: Actions
export const {
  setIsSmallPhone,
  setIsPhone,
  setIsSmallTablet,
  setIsMediumTablet,
  setIsTablet,
  setIsDesktop,
  setIsLaptop,
  setIsLargeDesktopScreen,
} = platformSlice.actions;

// NOTE: Selectors
export const platformStates = (state: RootState) => state.platform;

// NOTE: Reducer
const platformReducer = platformSlice.reducer;

export default platformReducer;
