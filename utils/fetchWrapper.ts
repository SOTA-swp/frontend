const formatUrl = (url: string, useServer: boolean) => {
  return `${useServer ? process.env.API_ROUTE : ""}${url}`;
};

export const fetchWrapper = {
  get: async (
    url: string,
    useServer: boolean = false,
    options: RequestInit = {}
  ) => {
    const response = await fetch(formatUrl(url, useServer), {
      ...options,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    return response;
  },
  post: async (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    useServer: boolean = false,
    options: RequestInit = {}
  ) => {
    const response = await fetch(formatUrl(url, useServer), {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });

    return response;
  },
  put: async (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    useServer: boolean = false,
    options: RequestInit = {}
  ) => {
    const response = await fetch(formatUrl(url, useServer), {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });

    return response;
  },
  delete: async (
    url: string,
    useServer: boolean = false,
    options: RequestInit = {}
  ) => {
    const response = await fetch(formatUrl(url, useServer), {
      ...options,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    return response;
  },
};
