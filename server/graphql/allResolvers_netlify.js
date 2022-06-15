// 1.) this file does not import GraphQLUpload
// because it clashes with apollo-server-lambda
// in the gql function.
// 
// 2.) we also dont need to declare the Upload 
// mutation to resolve the scaler defined in the typedefs
// 
// 3.) we dont need to import dotenv in this file because 
// we shall be reading the gcStorage env variables from netlify

const { v4: uuidv4 } = require("uuid");
const { Storage } = require("@google-cloud/storage");

const gc = new Storage({
  projectId: "welearned",
  credentials: {
    type: process.env.GCP_TYPE,
    project_id: process.env.GCP_PROJECT_ID,
    private_key_id: process.env.GCP_PRIVATE_KEY_ID,
    private_key: process.env.GCP_PRIVATE_KEY.split("\\n").join("\n"),
    client_email: process.env.GCP_CLIENT_EMAIL,
    client_id: process.env.GCP_CLIENT_ID,
    auth_uri: process.env.GCP_AUTH_URI,
    token_uri: process.env.GCP_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GCP_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GCP_CLIENT_X509_CERT_URL,
  },
});

const bucketName = "welearned-bucket";

// a function to remove any white spaces in filenames
const removeWhiteSpaces = (name) => {
  return name.replace(/\s+/g, "-");
};

const resolvers = {

  Mutation: {
    UploadFile: async (_, { file }) => {
      const { createReadStream, filename, mimetype } = await file;

      let sanitizedName = uuidv4() + "-" + removeWhiteSpaces(filename);

      console.log(sanitizedName);

      await new Promise((resolve, reject) =>
        createReadStream().pipe(
          gc
            .bucket(bucketName)
            .file(sanitizedName)
            .createWriteStream({
              // resumable: false,
              gzip: true,
            })
            .on("finish", () => {
              gc.bucket(bucketName)
                .file(sanitizedName)
                // make the file pubic
                .makePublic()
                .then(() => {
                  resolve();
                });
            })
          // .on("error", () => reject(false))
          // .on("error", () =>
          //   reject(`Unable to upload file, something went wrong`)
          // )
        )
      );
      return {
        fileId: uuidv4(),
        url: `https://storage.googleapis.com/${bucketName}/${sanitizedName}`,
        name: filename,
        type: mimetype,
        gcName: sanitizedName,
      };
    },
    RemoveFile: async (_, { gcName }) => {
      await gc.bucket(bucketName).file(gcName).delete().catch(console.error);
      return {
        gcName,
      };
    },
  },
};

module.exports = resolvers;
