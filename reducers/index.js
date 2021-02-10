import {combineReducers} from 'redux';
import test from './test';
import NavigationReucer from './NavigationReucer';
import allGroupsReducer from './groups/allGroupsReducer';
import loggedInUserGroupReducer from './groups/loggedInUserGroupReducer';
import allPublishersReducer from './publishers/allPublishersReducer';
import allPublicationsReducer from './publications/allPublicationsReducer';
import imageUploadReducer from './uploads/imageUploadReducer';
import LoaderKeyReducer from './uploads/LoaderKeyReducer';
import allTypesReducer from './types/allTypesReducer';
import allLanguagesReducer from './languages/allLanguagesReducer';
import allPerspectivesReducer from './perspective/allPerspectivesReducer';
import allheadlineReducer from './headlines/allheadlineReducer';
import selectedPublicationReducer from './publications/selectedPublicationReducer';
import allLocationReducer from './locations/allLocationReducer';
import selectedHeadlineReducer from './headlines/selectedHeadlineReducer';
import allCoverPagesReducer from './coverPage/allCoverPagesReducer';
import loginAction from './login/loginReducer';
import authorizationReducer from './login/authorizationReducer';
import loginErrorReducer from './login/loginErrorReducer';
import userDataReducer from './user/userDataReducer';
import allGendersReducer from './gender/allGendersReducer';
import registrationErrorReducer from './user/registrationErrorReducer';
import selectedPublicationIdReducer from './publications/selectedPublicationIdReducer';
import selectedCoverPageReducer from './coverPage/selectedCoverPageReducer';
import selectedPublisherReducer from './publishers/selectedPublisherReducer';
import commentReducer from './comment/commentReducer';
import changePasswordErrorReducer from './user/changePasswordErrorReducer';
import forgotPasswordNodetailsReducer from './login/forgotPasswordNodetailsReducer';
import userIdReducer from './user/userIdReducer';
import headlineErrorReducer from './headlines/headlineErrorReducer';
import coverPageErrorReducer from './coverPage/coverPageErrorReducer';


const appReducer = combineReducers({
    nav:NavigationReucer,
    allUserGroupsState:allGroupsReducer,
    allPublishersReducerState:allPublishersReducer,
    allPublicationsReducerState:allPublicationsReducer,
    imageUploadReducer:imageUploadReducer,
    LoaderKeyReducer:LoaderKeyReducer,
    allTypesReducer:allTypesReducer,
    allLanguagesReducer:allLanguagesReducer,
    allPerspectivesReducer:allPerspectivesReducer,
    allheadlineReducer:allheadlineReducer,
    selectedPublication:selectedPublicationReducer,
    allLocations:allLocationReducer,
    selectedHeadline:selectedHeadlineReducer,
    allCoverPages:allCoverPagesReducer,
    loggedInUserGroup:loggedInUserGroupReducer,
    loginAction:loginAction,
    authorizationReducer:authorizationReducer,
    loginErrorReducer:loginErrorReducer,
    userDataReducer:userDataReducer,
    allGendersReducer:allGendersReducer,
    registrationErrorReducer:registrationErrorReducer,
    selectedPublicationIdReducer:selectedPublicationIdReducer,
    selectedCoverPageReducer:selectedCoverPageReducer,
    selectedPublisherReducer:selectedPublisherReducer,
    commentReducer:commentReducer,
    changePasswordErrorReducer:changePasswordErrorReducer,
    forgotPasswordNodetailsReducer:forgotPasswordNodetailsReducer,
    userIdReducer:userIdReducer,
    headlineErrorReducer:headlineErrorReducer,
    coverPageErrorReducer:coverPageErrorReducer
});


export default RootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
};
