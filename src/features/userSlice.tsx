import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
// import { RootState } from '../../app/store';
import  {UserModel} from '../features/models/index'


interface UserAuthState {

  user:  undefined | string | UserModel | null ;   
  token: string | null | undefined;
  refreshToken: string | null | string | undefined | {} ;
}

const initialState: UserAuthState = { 
  user: null, 
  refreshToken: null ,
  token: null 
} 


export const userSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<{user:  undefined | string | UserModel | null, token: string | undefined | null, refreshToken: string | undefined | null  }>) => {
      localStorage.setItem('user', JSON.stringify({
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
       })
       );
       state.user = action.payload.user;
       state.token = action.payload.token;
       state.refreshToken = action.payload.refreshToken;
    },
    logoutUsers: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    }
    }
})
 export const selectCurrentUser = (state: RootState) => state.userState
export const {setUsers, logoutUsers} = userSlice.actions;
export default userSlice.reducer;