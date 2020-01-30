/** @format */

import { useEffect, useState } from 'react';

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

export { useGet, post, patch, deleted };
