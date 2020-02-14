import { types } from './Reducer';

export const useActions = (state, dispatch) => {
  function addTechIfNotInList(newTech) {
    const techIndex = state.techList.indexOf(newTech);
    if (techIndex !== -1) {
      alert('Tech is defined in list');
    } else {
      dispatch({ type: types.ADD_TO_TECH_LIST, payload: newTech });
    }
  }

  const setUser = users => {
    dispatch({ type: types.SET_USER, payload: users });
  };

  const setLogin = login => {
    dispatch({ type: types.SET_LOGIN, payload: login });
  };

  const setPedidos = pedidos => {
    dispatch({ type: types.SET_PEDIDO, payload: pedidos });
  };

  const setRefresh = refresh => {
    dispatch({ type: types.SET_REFRESH, payload: refresh });
  };

  const setRoutes = route => {
    dispatch({ type: types.SET_ROUTES, payload: route });
  };

  return {
    addTechIfNotInList,
    setUser,
    setPedidos,
    setRefresh,
    setRoutes,
    setLogin
  };
};
