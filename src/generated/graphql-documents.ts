import gql from 'graphql-tag';

export const GetOrganization = gql`
    query GetOrganization {
  organization {
    id
    name
    identifier
    state
    creationDate
  }
}
    `;
export const CreateProject = gql`
    mutation CreateProject($project: ProjectInput!) {
  createProject(project: $project) {
    id
    name
    description
    state
    platform
    region
    uri
    quota {
      storage
      contents
      credits
      feeds
      posts
      conversations
      userCredits
    }
    creationDate
    modifiedDate
  }
}
    `;
export const DeleteProject = gql`
    mutation DeleteProject($id: ID!) {
  deleteProject(id: $id) {
    id
    name
    state
  }
}
    `;
export const GetProject = gql`
    query GetProject($id: ID!) {
  project(id: $id) {
    id
    name
    description
    state
    platform
    region
    uri
    creationDate
    modifiedDate
    owner {
      id
    }
    quota {
      storage
      contents
      credits
      feeds
      posts
      conversations
      userCredits
    }
    environments {
      id
      name
      type
      state
      jwtSecret
      uri
    }
    subscription {
      status
      identifier
      description
      products {
        name
        identifier
      }
    }
  }
}
    `;
export const GetProjectInvoices = gql`
    query GetProjectInvoices($id: ID!) {
  project(id: $id) {
    id
    name
    invoices {
      status
      periodStartDate
      periodEndDate
      amountDue
      amountPaid
      number
      uri
      currency
    }
    upcomingInvoice {
      status
      periodStartDate
      periodEndDate
      amountDue
      amountPaid
      number
      uri
      currency
      lines {
        description
        identifier
        amount
        currency
        quantity
        unitAmount
        proration
        productName
        billingScheme
        usageType
        aggregateUsageType
        periodStartDate
        periodEndDate
      }
    }
  }
}
    `;
export const QueryProjects = gql`
    query QueryProjects($filter: ProjectFilter) {
  projects(filter: $filter) {
    results {
      id
      name
      description
      state
      platform
      region
      uri
      creationDate
      modifiedDate
      owner {
        id
      }
      quota {
        storage
        contents
        credits
        feeds
        posts
        conversations
        userCredits
      }
      environments {
        id
        name
        type
        state
        jwtSecret
        uri
      }
      subscription {
        status
        identifier
        description
        products {
          name
          identifier
        }
      }
    }
  }
}
    `;
export const UpdateProject = gql`
    mutation UpdateProject($project: ProjectUpdateInput!) {
  updateProject(project: $project) {
    id
    name
    description
    state
    platform
    region
    uri
    quota {
      storage
      contents
      credits
      feeds
      posts
      conversations
      userCredits
    }
    creationDate
    modifiedDate
  }
}
    `;
export const UpdateProjectSubscription = gql`
    mutation UpdateProjectSubscription($id: ID!, $productIdentifier: String!) {
  updateProjectSubscription(id: $id, productIdentifier: $productIdentifier) {
    id
    name
    subscription {
      identifier
      status
    }
  }
}
    `;
export const UpgradePayAsYouGo = gql`
    mutation UpgradePayAsYouGo($id: ID!) {
  upgradePayAsYouGo(id: $id) {
    id
    name
    subscription {
      identifier
      status
    }
  }
}
    `;