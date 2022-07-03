const baseurl = process.env.REACT_APP_DEVELOPMENT_URL;

async function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  const URL = `http://localhost:8080/${endpoint}`;
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders
    },
    ...customConfig
  };

  return fetch(URL, config).then(async (response) => {
    // if (response.status === 404) {
    //   window.location.assign(window.location);
    //   return Promise.reject({ message: "Please re-authenticate." });
    // }

    try {
      const data = await response.json();
      return data;
    } catch {
      return Promise.reject(data);
    }
  });
}

export { client };
