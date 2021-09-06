// import config from 'config';
import { authHeader } from '../helpers';
import userService from './user.service';

export const dataService = {
  getDeliveries,
  getDelivery,
  editDelivery,
};

const config = { apiUrl: 'http://localhost:4000' };

function getDeliveries(limit, page) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(
    `${config.apiUrl}/api/v1/deliveries?limit=${limit}&page=${page}`,
    requestOptions
  )
    .then(handleResponse)
    .then((deliveries) => {
      return deliveries;
    });
}

function getDelivery(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/api/v1/deliveries/${id}`, requestOptions)
    .then(handleResponse)
    .then((delivery) => {
      return delivery;
    });
}

function editDelivery(delivery) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(delivery),
  };

  return fetch(`${config.apiUrl}/api/v1/deliveries/edit`, requestOptions)
    .then(handleResponse)
    .then(() => {
      return true;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
