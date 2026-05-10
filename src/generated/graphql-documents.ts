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
export const AddServiceClientKey = gql`
    mutation AddServiceClientKey($id: ID!, $clientId: String!, $key: ServiceClientKeyInput!) {
  addServiceClientKey(id: $id, clientId: $clientId, key: $key) {
    id
    name
    type
    state
    jwtSecret
    uri
    serviceClients {
      name
      clientId
      scopes
      role
      state
      createdAt
      keys {
        name
        kid
        kty
        alg
        use
        publicJwk
        publicKeyFingerprint
        state
        createdAt
      }
    }
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
export const CreateServiceClient = gql`
    mutation CreateServiceClient($id: ID!, $input: ServiceClientInput!) {
  createServiceClient(id: $id, input: $input) {
    id
    name
    type
    state
    jwtSecret
    uri
    serviceClients {
      name
      clientId
      scopes
      role
      state
      createdAt
      keys {
        name
        kid
        kty
        alg
        use
        publicJwk
        publicKeyFingerprint
        state
        createdAt
      }
    }
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
export const DisableServiceClient = gql`
    mutation DisableServiceClient($id: ID!, $clientId: String!) {
  disableServiceClient(id: $id, clientId: $clientId) {
    id
    name
    type
    state
    jwtSecret
    uri
    serviceClients {
      name
      clientId
      scopes
      role
      state
      createdAt
      keys {
        name
        kid
        kty
        alg
        use
        publicJwk
        publicKeyFingerprint
        state
        createdAt
      }
    }
  }
}
    `;
export const DisableServiceClientKey = gql`
    mutation DisableServiceClientKey($id: ID!, $clientId: String!, $kid: String!) {
  disableServiceClientKey(id: $id, clientId: $clientId, kid: $kid) {
    id
    name
    type
    state
    jwtSecret
    uri
    serviceClients {
      name
      clientId
      scopes
      role
      state
      createdAt
      keys {
        name
        kid
        kty
        alg
        use
        publicJwk
        publicKeyFingerprint
        state
        createdAt
      }
    }
  }
}
    `;
export const EnableServiceClient = gql`
    mutation EnableServiceClient($id: ID!, $clientId: String!) {
  enableServiceClient(id: $id, clientId: $clientId) {
    id
    name
    type
    state
    jwtSecret
    uri
    serviceClients {
      name
      clientId
      scopes
      role
      state
      createdAt
      keys {
        name
        kid
        kty
        alg
        use
        publicJwk
        publicKeyFingerprint
        state
        createdAt
      }
    }
  }
}
    `;
export const EnableServiceClientKey = gql`
    mutation EnableServiceClientKey($id: ID!, $clientId: String!, $kid: String!) {
  enableServiceClientKey(id: $id, clientId: $clientId, kid: $kid) {
    id
    name
    type
    state
    jwtSecret
    uri
    serviceClients {
      name
      clientId
      scopes
      role
      state
      createdAt
      keys {
        name
        kid
        kty
        alg
        use
        publicJwk
        publicKeyFingerprint
        state
        createdAt
      }
    }
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
      serviceClients {
        name
        clientId
        scopes
        role
        state
        createdAt
        keys {
          name
          kid
          kty
          alg
          use
          publicJwk
          publicKeyFingerprint
          state
          createdAt
        }
      }
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
export const RevokeServiceClient = gql`
    mutation RevokeServiceClient($id: ID!, $clientId: String!) {
  revokeServiceClient(id: $id, clientId: $clientId) {
    id
    name
    type
    state
    jwtSecret
    uri
    serviceClients {
      name
      clientId
      scopes
      role
      state
      createdAt
      keys {
        name
        kid
        kty
        alg
        use
        publicJwk
        publicKeyFingerprint
        state
        createdAt
      }
    }
  }
}
    `;
export const RevokeServiceClientKey = gql`
    mutation RevokeServiceClientKey($id: ID!, $clientId: String!, $kid: String!) {
  revokeServiceClientKey(id: $id, clientId: $clientId, kid: $kid) {
    id
    name
    type
    state
    jwtSecret
    uri
    serviceClients {
      name
      clientId
      scopes
      role
      state
      createdAt
      keys {
        name
        kid
        kty
        alg
        use
        publicJwk
        publicKeyFingerprint
        state
        createdAt
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
export const UpdateServiceClient = gql`
    mutation UpdateServiceClient($id: ID!, $clientId: String!, $input: ServiceClientUpdateInput!) {
  updateServiceClient(id: $id, clientId: $clientId, input: $input) {
    id
    name
    type
    state
    jwtSecret
    uri
    serviceClients {
      name
      clientId
      scopes
      role
      state
      createdAt
      keys {
        name
        kid
        kty
        alg
        use
        publicJwk
        publicKeyFingerprint
        state
        createdAt
      }
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