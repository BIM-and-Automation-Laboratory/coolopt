import ServiceManager from "../services/SvcManager";

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

const resolvers = {
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
};

module.exports = resolvers;
