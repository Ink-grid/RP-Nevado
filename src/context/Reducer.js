/** @format */

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  login: JSON.parse(localStorage.getItem('login')),
  pedido: JSON.parse(localStorage.getItem('pedido')),
  routes: JSON.parse(localStorage.getItem('routes'))
};

const types = {
  SET_USER: 'SET_USER',
  SET_LOGIN: 'SET_LOGIN',
  SET_PEDIDO: 'SET_PEDIDO',
  SET_REFRESH: 'SET_REFRESH',
  SET_ROUTES: 'SET_ROUTES'
};

const reducer = (state = initialState, action) => {
  //console.log({ oldState: state, type: action.type, payload: action.payload });
  switch (action.type) {
    case types.SET_USER:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload
      };
    case types.SET_LOGIN:
      localStorage.setItem('login', JSON.stringify(action.payload));
      return {
        ...state,
        login: action.payload
      };

    case types.SET_PEDIDO:
      localStorage.setItem('pedido', JSON.stringify(action.payload));
      return {
        ...state,
        pedido: action.payload
      };

    case types.SET_REFRESH:
      return {
        ...state,
        refresh: action.payload
      };

    case types.SET_ROUTES:
      localStorage.setItem('routes', JSON.stringify(action.payload));
      return {
        ...state,
        routes: action.payload
      };

    default:
      throw new Error('Unexpected action');
  }
};
export { initialState, types, reducer };
