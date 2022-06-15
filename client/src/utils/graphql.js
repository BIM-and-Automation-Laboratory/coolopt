import gql from "graphql-tag";

export const CREATE_ADMIN = gql`
  mutation createAdmin(
    $createdAt: _Neo4jDateTimeInput!
    $userId: String!
    $fullName: String!
    $email: String!
    $username: String!
    $identificationNumber: String!
  ) {
    CreateAdmin(
      createdAt: $createdAt
      userId: $userId
      fullName: $fullName
      email: $email
      username: $username
      identificationNumber: $identificationNumber
    ) {
      adminId
      userId
      fullName
      username
    }
  }
`;

export const GET_ADMINS = gql`
  {
    Admin {
      adminId
      userId
      email
      identificationNumber
    }
  }
`;

// Removing the file from the google cloud bucket
export const REMOVE_FILE = gql`
  mutation removeFile($gcName: String!) {
    RemoveFile(gcName: $gcName) {
      gcName
    }
  }
`;
// Remove the deleted file's metadata from neo-db
export const DELETE_FILE = gql`
  mutation deleteFile($fileId: ID!) {
    DeleteFile(fileId: $fileId) {
      fileId
    }
  }
`;

// GQL client requests here
