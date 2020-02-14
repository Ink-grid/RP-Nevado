/** @format */

import { useEffect, useState, useContext } from 'react';
import { StoreContext } from 'context/StoreContext';

const useGet = urls => {
  const configServiceDefault = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default'
  };

  const [data, setData] = useState(null);
  const [config] = useState(configServiceDefault);
  const [refresh, setRefresh] = useState(null);

  const crudData = async () => {
    try {
      const data = await fetch(urls, config);
      if (data.ok) {
        setData(await data.json());
      }
      // setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    crudData();
  }, [config, refresh]);

  return [data, setRefresh, setData];
};

const useRouter = urls => {
  const configServiceDefault = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default'
  };

  const { state, actions } = useContext(StoreContext);
  const [route, setRoutes] = useState(null);
  console.log(state.routes);
  const getRoutes = async () => {
    try {
      if (state.routes === null) {
        const routes = await fetch(urls, configServiceDefault);
        if (routes.ok) {
          let response = await routes.json();
          if (response.status) {
            setRoutes(response.data);
            actions.setRoutes(response.data);
          }
        }
      } else {
        setRoutes(state.routes);
      }
      // setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoutes();
  }, []);

  return [route];
};

const post = async (url, data) => {
  const configDefault = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    mode: 'cors',
    cache: 'default'
  };

  //const [datapost, setDatapost] = useState(null);
  try {
    const data = await fetch(url, configDefault);
    if (data.ok) {
      return await data.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const patch = async (url, data) => {
  const configDefault = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    mode: 'cors',
    cache: 'default'
  };
  try {
    const data = await fetch(url, configDefault);
    if (data.ok) {
      return await data.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const deleted = async url => {
  const configDefault = {
    method: 'DELETE'
  };
  try {
    const data = await fetch(url, configDefault);
    if (data.ok) {
      return await data.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export { useGet, useRouter, post, patch, deleted };
