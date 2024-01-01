import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { UserProfileModel } from "../models/auth";
import { removeLocalStorage } from "../utils/localStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../consts/app";

interface InitialStateProps {
  userId: number;
  loading: number;
  profile: UserProfileModel | null;
}

const initialState: InitialStateProps = {
  userId: -1,
  loading: 0,
  profile: null,
};

const globalSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    updateUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    setLoading: (state, action: PayloadAction<"ADD" | "REMOVE">) => {
      switch (action.payload) {
        case "ADD":
          state.loading++;
          break;
        case "REMOVE":
          state.loading--;
          break;
        default:
          break;
      }
    },
    updateUserProfile: (
      state,
      action: PayloadAction<UserProfileModel | null>
    ) => {
      state.profile = action.payload;
    },
    logout: (state) => {
      state.profile = null;
      removeLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    },
  },
});

export const { updateUserId, setLoading, updateUserProfile, logout } =
  globalSlice.actions;

// NOTE: Selectors
export const selectUserId = (state: RootState) => state.global.userId;
export const selectLoading = (state: RootState) => state.global.loading;
export const selectProfile = (state: RootState) => state.global.profile;

// NOTE: Reducer
const globalReducer = globalSlice.reducer;

export default globalReducer;
