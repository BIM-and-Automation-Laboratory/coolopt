const { v4: uuidv4 } = require("uuid");
const { GraphQLUpload } = require("graphql-upload");
const { Storage } = require("@google-cloud/storage");
const config = require("../../config/config");
const ServiceManager = require("../api/services/SvcManager");

///////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////
const onError = (ex) => {
  return {
    data: null,
    error: ex,
  };
};

///////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////
const onResponse = (res) => {
  if (res.statusCode === 200) {
    return {
      data: res.body.data,
      error: null,
    };
  }

  return {
    data: null,
    error: {},
  };
};

///////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////

const forgeSvc = ServiceManager.getService("ForgeSvc");

const dmSvc = ServiceManager.getService("DMSvc");

///////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////
const gc = new Storage({
  projectId: "welearned",
  credentials: {
    type: config.googleCloud.gcpType,
    project_id: config.googleCloud.gcpProjectId,
    private_key_id: config.googleCloud.gcpPrivateKeyId,
    private_key: config.googleCloud.gcpPrivateKey.split("\\n").join("\n"),
    client_email: config.googleCloud.gcpClientEmail,
    client_id: config.googleCloud.gcpClientId,
    auth_uri: config.googleCloud.gcpAuthUri,
    token_uri: config.googleCloud.gcpTokenUri,
    auth_provider_x509_cert_url: config.googleCloud.gcpAuthProviderX509CertUrl,
    client_x509_cert_url: config.googleCloud.gcpClientX509CertUrl,
  },
});

const bucketName = "welearned-bucket";

// a function to remove any white spaces in filenames
const removeWhiteSpaces = (name) => {
  return name.replace(/\s+/g, "-");
};

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    hubs: async (root, args, { session }) => {
      try {
        const token = await forgeSvc.get3LeggedTokenMaster(session);

        const res = await dmSvc.getHubs(token);

        return onResponse(res);
      } catch (ex) {
        return onError(ex);
      }
    },
    hub: async (root, { hubId }, { session }) => {
      try {
        const token = await forgeSvc.get3LeggedTokenMaster(session);

        const res = await dmSvc.getHub(token, hubId);

        return onResponse(res);
      } catch (ex) {
        return onError(ex);
      }
    },
    project: async (root, { hubId, projectId }, { session }) => {
      try {
        const token = await forgeSvc.get3LeggedTokenMaster(session);

        const res = await dmSvc.getProject(token, hubId, projectId);

        return onResponse(res);
      } catch (ex) {
        return onError(ex);
      }
    },
    projects: async (root, { hubId }, { session }) => {
      try {
        const token = await forgeSvc.get3LeggedTokenMaster(session);

        const res = await dmSvc.getProjects(token, hubId);

        return onResponse(res);
      } catch (ex) {
        return onError(ex);
      }
    },
    topFolders: async (root, { hubId, projectId }, { session }) => {
      try {
        const token = await forgeSvc.get3LeggedTokenMaster(session);

        const res = await await dmSvc.getProjectTopFolders(
          token,
          hubId,
          projectId
        );

        return onResponse(res);
      } catch (ex) {
        return onError(ex);
      }
    },
    folderContent: async (root, { projectId, folderId }, { session }) => {
      try {
        const token = await forgeSvc.get3LeggedTokenMaster(session);

        const res = await dmSvc.getFolderContent(token, projectId, folderId);

        return onResponse(res);
      } catch (ex) {
        return onError(ex);
      }
    },
    folder: async (root, { projectId, folderId }, { session }) => {
      try {
        const token = await forgeSvc.get3LeggedTokenMaster(session);

        const res = await await dmSvc.getFolder(token, projectId, folderId);

        return onResponse(res);
      } catch (ex) {
        return onError(ex);
      }
    },
    itemVersions: async (root, { projectId, itemId }, { session }) => {
      try {
        const token = await forgeSvc.get3LeggedTokenMaster(session);

        const res = await await dmSvc.getItemVersions(token, projectId, itemId);

        return onResponse(res);
      } catch (ex) {
        return onError(ex);
      }
    },
  },

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
