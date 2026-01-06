export const fetchWrapper = {
  get: async (
    url: string,
    useSever: boolean = false,
    options: RequestInit = {}
  ) => {
    url = `${useSever ? process.env.API_ROUTE : ""}${url}`;
    const response = await fetch(url, {
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
    url = `${useServer ? process.env.API_ROUTE : ""}${url}`;
    const response = await fetch(url, {
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
    url = `${useServer ? process.env.API_ROUTE : ""}${url}`;
    const response = await fetch(url, {
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
};
