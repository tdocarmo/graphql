import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
query ProfilData {
  xp: transaction_aggregate(
    where: {userId: {_eq: 3314}, type: {_eq: "xp"}, eventId: {_eq: 216}}
  ) {
    aggregate {
      sum {
        amount
      }
    }
  }
  level: transaction(
    limit: 1
    order_by: {amount: desc}
    where: {userId: {_eq: 3314}, type: {_eq: "level"}, eventId: {_eq: 216}}
  ) {
    amount
  }
  user {
    auditRatio
    campus
    createdAt
    email
    firstName
    lastName
    totalDown
    totalUp
  }
}
`;

export const GET_LAST_PROJECT = gql`
  query GetLastProject {
    user {
      xps(order_by: { amount: desc }, limit: 3) {
        amount
        originEventId
        path
      }
    }
  }
`;

export const GET_XP = gql`
  query GetXp {
    transaction(where: { type: { _eq: "xp" } }) {
      amount
      path
      createdAt
    }
  }
`;
