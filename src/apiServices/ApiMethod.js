import { isValidValue } from "../../helpers/helpers";

const config = {
  PROD: {
    versionUrl: "https://apiconsole.mitigata.com/tbi/api/v1/",
    url: "https://apiconsole.mitigata.com/tbi/",
    value: "PROD",
    deployedOn: "https://console.mitigata.com/",
  },
  DEV: {
    versionUrl: "https://insuranceapiv2.iostream.in/tbi/api/v1/",
    url: "https://insuranceapiv2.iostream.in/tbi/",
    value: "DEV",
    deployedOn: "https://insuranceapiv2.iostream.in/",
  },
};
var Environment;
(function (Environment) {
  Environment["DEV"] = "DEV";
  Environment["PROD"] = "PROD";
})(Environment || (Environment = {}));

export const ENV = Environment.DEV;
// export const ENV: EnvironmentType = process.env
//   .REACT_APP_ENV_TYPE as EnvironmentType;

export function getEnvironment() {
  return config[ENV];
}

export const API_BASE_URL = config[ENV].url;
export const API_VERSIONED_BASE_URL = config[ENV].versionUrl;
export const DEPLOYMENT_URL = config[ENV].deployedOn;

export const CONTACT_EMAIL = "contact@mitigta.com";
export const CONTACT_PHONE = "+91-780-715-3087";

export const getCalendlyLink = () => {
  return "https://calendly.com/mitigata-expert/expert-connect";
};

export const getPublicKey = () => {
  return "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4wdIo1kk2XggdzPms/53dp4KbGAvJUUPnbz23RzkcUrzf2mJGAV+KSUz7r5yNYJ7noV8WFxvWNAei2ApPkcCV/ZC7oY6K5FKlo8IA98YItQ7bPdIKmwhLz36VCfQ38Ew/QFWNNtqCC6fOyVREF07ykVgAJY5tsjPbgzd66gY8o4VCfAWHVY2x1tqiN6MY1AKQ170EBC8LsQbBvTjDeigCeNI00QXAJYLp3AEu1opoxJqyBfElrkWoCuLWR4R3XmDMM3+X3Htu/5e/JY4VLdAh7x4vOJxfxG2La1cKqS5SM9HwbTUVPeYktiqmX5j/Tb0dWYonwU6WLPZGAOhp83Z6wIDAQAB";
};

export const getGCID = () => {
  return "1096817630877-e7j93veuunijoqdjgsre5koii2orm5mq.apps.googleusercontent.com";
};

export const getHeaders = (userId, token) => {
  // if(token !== undefined && userId !== undefined){
  return {
    Authorization: "Bearer " + token,
    userid: userId,
    "Content-Type": "application/json",
    client_type: "web",
    version_code: "40",
  };
};

export const getHeadersFileUpload = (userId, token) => {
  return {
    Authorization: "Bearer " + token,
    userid: userId,
    client_type: "ios",
  };
};

export const getHeaderExcelSheetFileUpload = (userId, token) => {
  return {
    Authorization: "Bearer " + token,
    userid: userId,
  };
};

export const uploadExcelSheetRequest = async (name, source, userId, token) => {
  let formData = new FormData();
  let fileUri = source.uri;
  formData.append("file", source);
  formData.append("type", source.type);
  return fetch(
    API_VERSIONED_BASE_URL + `admin-api/partner-org/upload-partner-orgs`,
    {
      method: "POST",
      headers: getHeaderExcelSheetFileUpload(userId, token),
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
export const getAuthHeaders = () => {
  return {
    "Content-Type": "application/json",
    client_type: "ios",
    version_code: "40",
  };
};

export const sendGoogleAuthCode = async (code, userId, token) => {
  return postRequest(
    API_VERSIONED_BASE_URL + "google/save-code",
    JSON.stringify({ code: code }),
    userId,
    token
  ).then((res) => {
    if (res) {
      return true;
    } else {
      return false;
    }
  });
};

export const getRequest = async (url, userId, token) => {
  return fetchRequest("GET", url, userId, token);
};

export const postRequest = async (url, body, userId, token) => {
  return fetchRequest("POST", url, userId, token, body);
};

export const deleteRequest = async (url, userId, token) => {
  return fetchRequest("DELETE", url, userId, token);
};

const fetchRequest = async (method, url, userId, token, body) => {
  if (userId && isValidValue(userId) && token && isValidValue(token)) {
    return fetch(url, {
      method: method,
      headers: getHeaders(userId, token),
      body: body !== undefined ? body : undefined,
    })
      .then((res) => check401(res))
      .then((res) => {
        if (res.statusCode === 401) {
          window.location.href = "/";
        } else {
          return res;
        }
      })

      .then((responseJson) => {
        {
          return responseJson;
        }
      })
      .catch((e) => console.log(e));
  } else {
    window.location.href = "/";
  }
};

export const uploadImageRequest = async (name, type, source, userId, token) => {
  let formData = new FormData();
  let fileUri = source.uri;
  fileUri = fileUri.replace("file://", "");
  const v = new File([fileUri], name);

  formData.append("file", v);
  formData.append("type", type);
  formData.append("subType", type);
  return fetch(API_BASE_URL + "/media/upload", {
    method: "POST",
    headers: getHeadersFileUpload(userId, token),
    body: formData,
  })
    .then((response) => response.json())
    .then((response) => {
      return response.url;
    })
    .catch((error) => {
      return error;
    });
};

export const check401 = (jsonResponse) => {
  if (
    (jsonResponse && jsonResponse.status && jsonResponse.status === 401) ||
    (jsonResponse && jsonResponse.statusCode && jsonResponse.statusCode === 401)
  ) {
    // useNavigation().navigate('Login')
    return 401;
  }
  return jsonResponse;
};
export const checkError = (jsonResponse) => {
  if (
    (jsonResponse && jsonResponse.status && jsonResponse.status === 400) ||
    (jsonResponse && jsonResponse.statusCode && jsonResponse.statusCode === 400)
  ) {
    return 400;
  }
  return jsonResponse;
};

export const check500 = (jsonResponse) => {
  if (
    (jsonResponse && jsonResponse.status && jsonResponse.status === 500) ||
    (jsonResponse && jsonResponse.statusCode && jsonResponse.statusCode === 500)
  ) {
    return 401;
  }
  return jsonResponse;
};
