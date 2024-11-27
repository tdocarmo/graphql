import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query MyQuery {
    user {
      firstName
      lastName
      auditRatio
      campus
      createdAt
    }
  }
`;

export const GET_USER_STATS = gql`
  query GetUserStats($userId: ID!) {
    userStats(id: $userId) {
      totalProjects
      totalExperience
      skillRatings
    }
  }
`;

export const GET_USER_GROUPS = gql`
  query GetUserGroups($userId: ID!) {
    groups(userId: $userId) {
      id
      objectId
      eventId
      captainId
      status
      createdAt
    }
  }
`;

export const GET_GROUP_DETAILS = gql`
  query GetGroupDetails($groupId: ID!) {
    group(id: $groupId) {
      id
      objectId
      eventId
      captainId
      status
      updatedAt
      users {
        id
        name
      }
    }
  }
`;

export const GET_GROUP_AUDITS = gql`
  query GetGroupAudits($groupId: ID!) {
    audits(groupId: $groupId) {
      id
      grade
      auditorId
      attrs
      createdAt
      resultId
      endAt
      private
    }
  }
`;

export const GET_AUDIT_DETAILS = gql`
  query GetAuditDetails($auditId: ID!) {
    audit(id: $auditId) {
      id
      groupId
      auditorId
      attrs
      grade
      createdAt
      updatedAt
      code
      resultId
      version
      endAt
      private
    }
  }
`;

export const GET_USER_RESULT = gql`
  query GetUserResult($userId: ID!, $objectId: ID!) {
    result(userId: $userId, objectId: $objectId) {
      id
      grade
      createdAt
      updatedAt
      attrs
      version
      eventId
      isLast
    }
  }
`;
