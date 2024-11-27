import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
query MyQuery {
  user {
    id
    login
    attrs
    auditRatio
    totalUp
    totalDown
    xps {
      amount
      path
    }
  }
  transaction {
    type
    amount
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
