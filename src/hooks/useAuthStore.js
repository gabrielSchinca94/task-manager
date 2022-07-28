import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

import taskManagerApi from '../api/taskManagerApi';
import {onChecking, onLogin, onLogout, clearErrorMessage} from '../store/auth/authSlice';

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {

        dispatch(onChecking());

        try{
            const response = await taskManagerApi.post('/login/', {username:email, password});
            const {data} = response;

            localStorage.setItem('access-token', data.access);
            localStorage.setItem('refresh-token', data.refresh);

            const user = jwt_decode(data.access);

            dispatch(onLogin({name:user.username, uid:user.user_id}));


        }catch(error){
            dispatch(onLogout('Incorrect credentials'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {

        const accessToken = localStorage.getItem('access-token');
        const refreshToken = localStorage.getItem('refresh-token');

        if ( !accessToken ) return dispatch(onLogout('Session expired'));

        try{
            const user = jwt_decode(accessToken);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

            if(!isExpired) dispatch(onLogin({name:user.username, uid:user.user_id}));

            if(isExpired){

                const response = await taskManagerApi.post('/token/refresh/', {refresh:refreshToken});
                const {data} = response;
                localStorage.setItem('access-token', data.access);
                localStorage.setItem('refresh-token', data.refresh);
                dispatch(onLogin({name:user.username, uid:user.user_id}));
            
            }

        }catch(error){
            localStorage.clear();
            dispatch(onLogout());
        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        //* Parametros
        errorMessage,
        status, 
        user,

        //* Metodos
        startLogin,
        startLogout,
        checkAuthToken
    }
}