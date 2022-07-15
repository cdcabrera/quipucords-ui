import { serviceCall } from './config';

const addSource = (data = {}, params = {}) =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve(
          serviceCall({
            method: 'post',
            url: process.env.REACT_APP_SOURCES_SERVICE,
            data,
            params
          })
        ),
      6000
    );
  });

const deleteSource = id =>
  serviceCall({
    method: 'delete',
    url: `${process.env.REACT_APP_SOURCES_SERVICE}${id}/`
  });

const deleteSources = (data = []) => Promise.all(data.map(id => deleteSource(id)));

const getSources = (id = '', params = {}) =>
  serviceCall(
    {
      url: `${process.env.REACT_APP_SOURCES_SERVICE}${id}`,
      params
    },
    { auth: false }
  );

const getSource = id => getSources(id);

const updateSource = (id, data = {}) =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve(
          serviceCall({
            method: 'put',
            url: `${process.env.REACT_APP_SOURCES_SERVICE}${id}/`,
            data
          })
        ),
      6000
    );
  });

const sourcesService = {
  addSource,
  deleteSource,
  deleteSources,
  getSources,
  getSource,
  updateSource
};

export {
  sourcesService as default,
  sourcesService,
  addSource,
  deleteSource,
  deleteSources,
  getSources,
  getSource,
  updateSource
};
