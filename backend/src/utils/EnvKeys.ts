const EnvKeys = {
  PORT: "",
  JWT_SECRET_KEY: "",
  MONGODB_URL: "",
};

if (process.env.PORT) {
  EnvKeys.PORT = process.env.PORT;
}

if (process.env.MONGODB_URL) {
  EnvKeys.MONGODB_URL = process.env.MONGODB_URL;
}

if (process.env.JWT_SECRET_KEY) {
  EnvKeys.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
}

export default EnvKeys;
