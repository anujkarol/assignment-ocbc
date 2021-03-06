const baseurl = process.env.REACT_APP_DEVELOPMENT_URL;

async function client(endpoint, { data, token, headers: customHeaders } = {}) {
  const URL = `${baseurl}${endpoint}`;

  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders
    }
  };

  return fetch(URL, config).then(async (response) => {
    try {
      const data = await response.json();
      if (data.status === "failed" && data.error.name === "JsonWebTokenError") {
        console.log(data);
        localStorage.getItem["token"] = "";
        localStorage.getItem["username"] = "";
        window.location.pathname = "/";
        throw new Error();
      }
      return data;
    } catch {
      return Promise.reject(data);
    }
  });
}

export { client };
