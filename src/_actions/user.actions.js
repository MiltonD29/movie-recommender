import { userConstants } from '../_constants';
import { userService } from '../services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const userActions = {
  signin,
  signout,
  signup
};


/*=============================================
=            SIGNIN FUNCTION            =
=============================================*/
function signin(user) {

  function request(user) {
    return {
      type: userConstants.SIGNIN_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: userConstants.SIGNIN_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.SIGNIN_FAILURE,
      error
    }
  }

  return dispatch => {
    dispatch(request({ user }));

    userService.signin(user)
    .then((res) => {
      dispatch(success(res));
      history.push('/');
    }).catch((error) => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    });
  };
  
}


/*=============================================
=            SIGNOUT FUNCTION            =
=============================================*/
function signout() {
  userService.signout();
  return {
    type: userConstants.SIGNOUT
  };
}



/*=============================================
=            SIGNUP FUNCTION            =
=============================================*/
function signup(user) {

  function request(user) {
    return {
      type: userConstants.SIGNIN_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: userConstants.SIGNIN_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.SIGNIN_FAILURE,
      error
    }
  }

  return dispatch => {
    dispatch(request({ user }));
    userService.signup(user)
    .then((res) => {
      dispatch(success(res));
      history.push('/');
    }).catch((error) => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    });
  };
  
}
