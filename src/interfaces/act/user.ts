import {
    logInRequest,
    logInSuccess,
    logInFailure,
    logOutRequest,
    logOutSuccess,
    logOutFailure,
    signUpRequest,
    signUpSuccess,
    signUpFailure,
    signUpClear,
    loadProfileFailure,
    loadProfileRequest,
    loadProfileSuccess,
    modifyProfileClear,
    modifyProfileFailure,
    modifyProfileRequest,
    modifyProfileSuccess,
    loadUserProfileFailure,
    loadUserProfileRequest,
    loadUserProfileSuccess,
    modifyLikelist,
} from '../../redux/modules/user';

export type UserAction =
    | ReturnType<typeof logInRequest>
    | ReturnType<typeof logInSuccess>
    | ReturnType<typeof logInFailure>
    | ReturnType<typeof logOutRequest>
    | ReturnType<typeof logOutSuccess>
    | ReturnType<typeof logOutFailure>
    | ReturnType<typeof signUpRequest>
    | ReturnType<typeof signUpSuccess>
    | ReturnType<typeof signUpFailure>
    | ReturnType<typeof signUpClear>
    | ReturnType<typeof loadProfileRequest>
    | ReturnType<typeof loadProfileSuccess>
    | ReturnType<typeof loadProfileFailure>
    | ReturnType<typeof loadUserProfileRequest>
    | ReturnType<typeof loadUserProfileSuccess>
    | ReturnType<typeof loadUserProfileFailure>
    | ReturnType<typeof modifyProfileRequest>
    | ReturnType<typeof modifyProfileSuccess>
    | ReturnType<typeof modifyProfileFailure>
    | ReturnType<typeof modifyProfileClear>
    | ReturnType<typeof modifyLikelist>;
