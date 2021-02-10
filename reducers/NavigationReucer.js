import MyNavigator from '../routes/routes';

export default function navReducer (state, action){
    const newState = MyNavigator.router.getStateForAction(action, state);
    return (newState ? newState : state)
};
