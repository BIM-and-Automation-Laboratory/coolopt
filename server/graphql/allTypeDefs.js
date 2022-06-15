const typeDefs = /* GraphQL */ `
  scalar Upload

  type File {
    fileId: ID!
    url: String!
    name: String!
    type: String!
    gcName: String!
  }

  type ItemVersionsResponse {
    data: [Version]
    error: Error
  }
  type FolderContentResponse {
    data: [FolderOrItem]
    error: Error
  }
  type ProjectsResponse {
    data: [Project]
    error: Error
  }
  type ProjectResponse {
    data: Project
    error: Error
  }
  type FolderResponse {
    data: Folder
    error: Error
  }
  type HubsResponse {
    error: Error
    data: [Hub]
  }
  type HubResponse {
    error: Error
    data: Hub
  }
  type Hub {
    attributes: Attributes
    id: String
  }
  type Project {
    attributes: Attributes
    id: String
  }
  type Folder {
    attributes: Attributes
    id: String
  }
  type FolderOrItem {
    attributes: Attributes
    id: String
  }
  type Item {
    attributes: Attributes
    id: String
  }
  type Version {
    relationships: Relationships
    attributes: Attributes
    id: String
  }
  type Relationships {
    derivatives: Derivatives
  }
  type Derivatives {
    data: Data
  }
  type Data {
    id: String
  }
  type Attributes {
    extension: Extension
    displayName: String
    name: String
  }
  type Extension {
    version: String
    type: String
  }
  type Error {
    message: String
  }

  type Admin {
    adminId: ID!
    userId: String!
    createdAt: DateTime!
    firstName: String!
    middleName: String
    lastName: String!
    birthDate: String!
    email: String!
    username: String!
    identificationNumber: String!
  }

  type Transmittal {
    transmittalID: ID!
    createdAt: DateTime!
    title: String!
    description: String!
    transmittalAttachments: [TransmittalAttachment]
      @relation(name: "HAS_ATTACHMENT", direction: OUT)
    recepients: [User!] @relation(name: "IS_FOR", direction: OUT)
    workflows: [Workflow]
      @relation(name: "BELONGS_TO_WORKFLOW", direction: OUT)
  }

  type Workflow {
    workflowID: ID!
    createdAt: DateTime!
    title: String!
    workFlowNodes: [WorkFlowNode]
      @relation(name: "HAS_WORKFLOW_NODE", direction: OUT)
    workFlowNodeLinks: [WorkFlowNodeLink]
      @relation(name: "HAS_WORKFLOW_NODE_LINK", direction: OUT)
    isTemplate: Boolean!
  }

  type WorkFlowNode {
    workFlowNodeId: ID!
    createdAt: DateTime!
    category: String!
    worflows: [Workflow] @relation(name: "HAS_WORKFLOW", direction: OUT)
  }

  type WorkFlowNodeLink {
    workFlowNodeLinkdId: ID!
    createdAt: DateTime!
    beforeWorkFlowNode: [WorkFlowNode]!
      @relation(name: "HAS_BEFORE_WORKFLOW_NODE", direction: OUT)
    afterWorkFlowNode: [WorkFlowNode]!
      @relation(name: "HAS_AFTER_WORKFLOW_NODE", direction: OUT)
  }

  type User {
    userId: ID!
    createdAt: DateTime!
    transmittals: [Transmittal]
      @relation(name: "HAS_TRANSMITTAL", direction: OUT)
  }

  type TransmittalAttachment {
    transmittalAttachmentID: ID!
    createdAt: DateTime!
    title: String!
    category: String!
  }

  type Query {
    itemVersions(projectId: String!, itemId: String!): ItemVersionsResponse
    folderContent(projectId: String!, folderId: String!): FolderContentResponse
    topFolders(hubId: String!, projectId: String!): FolderContentResponse
    project(hubId: String!, projectId: String!): ProjectResponse
    folder(projectId: String!, folderId: String!): FolderResponse
    projects(hubId: String!): ProjectsResponse
    hub(hubId: String!): HubResponse
    hubs: HubsResponse
  }

  type Mutation {
    # single uploads
    UploadFile(file: Upload!): File!

    # multiple uploads
    UploadFiles(files: [Upload!]): [File!]!

    RemoveFile(gcName: String!): File
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;
