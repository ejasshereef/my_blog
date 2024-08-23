const EnvKeys = {
  BACKEND_URL: "",
};

if (process.env.REACT_APP_BACKEND_URL) {
  EnvKeys.BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
}

export default EnvKeys;
