import gql from 'graphql-tag';

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
      credits
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