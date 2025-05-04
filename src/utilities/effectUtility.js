import ErrorModel from "@/models/error/errorModel";
import * as HttpUtility from "./httpClient";

function restModelCreator(Model, response) {
  if (response instanceof ErrorModel) {
    return response;
  }
  return {
    payload: !Array.isArray(response.data)
      ? new Model(response.data)
      : response.data.map((json) => new Model(json)),
    metadata: response.headers,
  };
}

export async function getToModel(
  Model,
  endpoint,
  params,
  requestConfig,
  isAuthenticated
) {
  const response = await HttpUtility.get(
    endpoint,
    params,
    requestConfig,
    isAuthenticated
  );
  return restModelCreator(Model, response);
}

export async function delToModel(
  Model,
  endpoint,
  data,
  isAuthenticated
) {
  const response = await HttpUtility.del(endpoint, isAuthenticated, data);
  return restModelCreator(Model, response);
}

export async function postToModel(
  Model,
  endpoint,
  data,
  requestConfig,
  isAuthenticated
) {
  const response = await HttpUtility.post(
    endpoint,
    data,
    requestConfig,
    isAuthenticated
  );
  return restModelCreator(Model, response);
}

export async function putToModel(
  Model,
  endpoint,
  data,
  requestConfig,
  isAuthenticated
) {
  const response = await HttpUtility.put(
    endpoint,
    data,
    requestConfig,
    isAuthenticated
  );
  return restModelCreator(Model, response);
}

export async function patchToModel(
  Model,
  endpoint,
  data,
  requestConfig,
  isAuthenticated
) {
  const response = await HttpUtility.patch(
    endpoint,
    data,
    requestConfig,
    isAuthenticated
  );
  return restModelCreator(Model, response);
}
