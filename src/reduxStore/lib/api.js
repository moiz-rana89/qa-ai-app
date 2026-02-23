// const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.example.com"; // Fallback for demo

// class Api {
//   static async headers() {
//     return {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
//     };
//   }

//   static async headersMultiForm() {
//     return {
//       accept: "application/json",
//       Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
//     };
//   }

//   /**
//    * Performs a GET request.
//    * @param {string} route - The API endpoint route.
//    * @param {object} [queryParams] - Optional object of query parameters.
//    * @returns {Promise<object>} The JSON response from the API.
//    */
//   static get(route, queryParams) {
//     return this.xhr(route, null, "GET", queryParams); // Pass queryParams to xhr
//   }

//   static put(route, params) {
//     return this.xhr(route, params, "PUT");
//   }

//   static patch(route, params) {
//     return this.xhr(route, params, "PATCH");
//   }

//   static post(route, params) {
//     return this.xhr(route, params, "POST");
//   }

//   static delete(route, params = null) {
//     return this.xhr(route, params, "DELETE");
//   }

//   static putMultiForm(route, parama) {
//     return this.xhrMultiForm(route, parama, "PUT");
//   }

//   static postMultiForm(route, parama) {
//     return this.xhrMultiForm(route, parama, "POST");
//   }

//   static async xhrMultiForm(route, params, verb) {
//     const host = API_BASE_URL;
//     const url = `${host}${route}`;
//     const options = Object.assign(
//       { method: verb },
//       params ? { body: params } : null
//     );
//     options.headers = await Api.headersMultiForm();
//     return fetch(url, options)
//       .then((resp) => {
//         const json = resp.json();
//         if (resp.ok) {
//           if (route === "login") {
//             this.setStorage(resp); // Assuming setStorage exists elsewhere
//           }
//           return json;
//         }
//         return json.then((err) => {
//           if (resp?.status == 401) {
//             window.location.href = "/login";
//           }
//           throw err;
//         });
//       })
//       .then((json) => {
//         if (route === "login") {
//           this.setAuth(json); // Assuming setAuth exists elsewhere
//         }
//         return json;
//       });
//   }

//   /**
//    * Generic XMLHttpRequest (XHR) handler for JSON requests.
//    * @param {string} route - The API endpoint route.
//    * @param {object} [params] - Request body for POST/PUT/PATCH.
//    * @param {string} verb - HTTP method (e.g., 'GET', 'POST').
//    * @param {object} [queryParams] - Optional object of query parameters for GET requests.
//    * @returns {Promise<{data: object|Blob, contentType: string}>} The processed response data and its content type.
//    */
//   static async xhr(route, params, verb, queryParams) {
//     const host = API_BASE_URL;
//     let url = `${host}${route}`;

//     // Append query parameters for GET requests, handling arrays as repeated params
//     if (verb === "GET" && queryParams) {
//       const searchParams = new URLSearchParams();
//       for (const key in queryParams) {
//         if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
//           const value = queryParams[key];
//           if (Array.isArray(value)) {
//             value.forEach((item) => searchParams.append(key, item));
//           } else if (value !== undefined && value !== null) {
//             searchParams.append(key, value);
//           }
//         }
//       }
//       const queryString = searchParams.toString();
//       if (queryString) {
//         url = `${url}?${queryString}`;
//       }
//     }

//     const options = Object.assign(
//       { method: verb },
//       // Only include body for methods that typically have one
//       // && verb !== "DELETE"
//       params && verb !== "GET" ? { body: JSON.stringify(params) } : null
//     );
//     options.headers = await Api.headers();

//     return fetch(url, options)
//       .then(async (resp) => {
//         const contentType = resp.headers.get("Content-Type") || "";

//         if (resp.ok) {
//           if (contentType.includes("text/csv")) {
//             const blob = await resp.blob();
//             return { data: blob, contentType: contentType };
//           } else if (resp.status === 204) {
//             // No Content
//             return { data: {}, contentType: contentType };
//           } else {
//             const json = await resp.json();
//             return { data: json, contentType: contentType };
//           }
//         } else {
//           // Handle errors: try to parse JSON error message, otherwise throw response
//           const errorData = await resp.json().catch(() => resp.text());
//           const error = new Error(
//             `API Error: ${resp.status} ${resp.statusText} - ${
//               typeof errorData === "object"
//                 ? JSON.stringify(errorData)
//                 : errorData
//             }`
//           );
//           error.response = resp; // Attach the original response for more context
//           error.data = errorData; // Attach parsed error data
//           if (resp?.status == 401) {
//             localStorage.removeItem("auth_token");
//             localStorage.removeItem("user_details");
//             window.location.href = "/login";
//           }
//           if (resp?.status == 409) {
//             throw { ...errorData, status: resp?.status };
//           }
//           throw error;
//         }
//       })
//       .then((result) => {
//         return result; // Returns { data, contentType }
//       });
//   }

//   // Placeholder for setStorage and setAuth if they are not defined elsewhere
//   static setStorage(resp) {
//     console.log("setStorage called with response:", resp);
//     // Implement your storage logic here, e.g., localStorage.setItem("auth_token", resp.headers.get("Authorization"));
//   }

//   static setAuth(json) {
//     console.log("setAuth called with JSON:", json);
//     // Implement your auth logic here, e.g., localStorage.setItem("user_data", JSON.stringify(json));
//   }
// }

// export default Api;

const API_BASE_URL = import.meta.env.VITE_API_URL;

class Api {
  static async headers() {
    return {
      "Content-Type": "application/json",
    };
  }

  static async headersMultiForm() {
    return {
      accept: "application/json",
    };
  }
  static get(route, queryParams) {
    return this.xhr(route, null, "GET", queryParams);
  }

  static post(route, params) {
    return this.xhr(route, params, "POST");
  }

  static put(route, params) {
    return this.xhr(route, params, "PUT");
  }

  static patch(route, params) {
    return this.xhr(route, params, "PATCH");
  }

  static delete(route, params = null) {
    return this.xhr(route, params, "DELETE");
  }

  static postMultiForm(route, params) {
    return this.xhrMultiForm(route, params, "POST");
  }

  static putMultiForm(route, params) {
    return this.xhrMultiForm(route, params, "PUT");
  }

  static async xhrMultiForm(route, params, verb, retry = true) {
    const url = `${API_BASE_URL}${route}`;

    const options = {
      method: verb,
      body: params || null,
      headers: await Api.headersMultiForm(),
      credentials: "include",
    };

    const resp = await fetch(url, options);

    if (resp.status === 401 && retry) {
      await Api.refreshToken();
      return Api.xhrMultiForm(route, params, verb, false);
    }

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw err;
    }

    return resp.json();
  }

  static async xhr(route, params, verb, queryParams, retry = true) {
    let url = `${API_BASE_URL}${route}`;

    if (verb === "GET" && queryParams) {
      const searchParams = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, v));
        } else if (value !== null && value !== undefined) {
          searchParams.append(key, value);
        }
      });
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }

    const options = {
      method: verb,
      headers: await Api.headers(),
      credentials: "include",
    };

    if (params && verb !== "GET") {
      options.body = JSON.stringify(params);
    }

    return fetch(url, options)
      .then(async (resp) => {
        const contentType = resp.headers.get("Content-Type") || "";

        if (resp.ok) {
          if (contentType.includes("text/csv")) {
            const blob = await resp.blob();
            return { data: blob, contentType: contentType };
          } else if (resp.status === 204) {
            return { data: {}, contentType: contentType };
          } else {
            const json = await resp.json();
            return { data: json, contentType: contentType };
          }
        } else {
          const errorData = await resp.json().catch(() => resp.text());
          const error = new Error(
            `API Error: ${resp.status} ${resp.statusText} - ${
              typeof errorData === "object"
                ? JSON.stringify(errorData)
                : errorData
            }`
          );
          error.response = resp;
          error.data = errorData;
          if (resp.status === 401 && retry) {
            await Api.refreshToken();
            return Api.xhr(route, params, verb, queryParams, false);
          }
          if (resp?.status == 409) {
            throw { ...errorData, status: resp?.status };
          }
          throw error;
        }
      })
      .then((result) => {
        return result;
      });
  }

  static refreshPromise = null;

  static async refreshToken() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = fetch(`${API_BASE_URL}/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then((resp) => {
        if (!resp.ok) {
          window.location.href = "/login";
          throw new Error("Session expired");
        }
        return resp.json();
      })
      .finally(() => {
        this.refreshPromise = null;
      });

    return this.refreshPromise;
  }

  static async logout() {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  }
}

export default Api;
