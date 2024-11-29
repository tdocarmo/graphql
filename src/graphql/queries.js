import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query ProfilData {
    xp: transaction_aggregate(
      where: {
        userId: { _eq: 3314 }
        type: { _eq: "xp" }
        eventId: { _eq: 216 }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    level: transaction(
      limit: 1
      order_by: { amount: desc }
      where: {
        userId: { _eq: 3314 }
        type: { _eq: "level" }
        eventId: { _eq: 216 }
      }
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

export const GET_SKILLS = gql`
  query {
    user {
      transactions_go: transactions(
        where: { type: { _eq: "skill_go" } }
        order_by: { id: desc }
        limit: 1
      ) {
        type
        amount
      }
      transactions_js: transactions(
        where: { type: { _eq: "skill_js" } }
        order_by: { id: desc }
        limit: 1
      ) {
        type
        amount
      }
      transactions_front_end: transactions(
        where: { type: { _eq: "skill_front-end" } }
        order_by: { id: desc }
        limit: 1
      ) {
        type
        amount
      }
      transactions_back_end: transactions(
        where: { type: { _eq: "skill_back-end" } }
        order_by: { id: desc }
        limit: 1
      ) {
        type
        amount
      }
      transactions_algo: transactions(
        where: { type: { _eq: "skill_algo" } }
        order_by: { id: desc }
        limit: 1
      ) {
        type
        amount
      }
      transactions_prog: transactions(
        where: { type: { _eq: "skill_prog" } }
        order_by: { id: desc }
        limit: 1
      ) {
        type
        amount
      }
      transactions_css: transactions(
        where: { type: { _eq: "skill_css" } }
        order_by: { id: desc }
        limit: 1
      ) {
        type
        amount
      }
    }
  }
`;
