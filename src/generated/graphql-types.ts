export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Long: { input: any; output: any; }
  TimeSpan: { input: any; output: any; }
  URL: { input: any; output: any; }
};

export enum AggregateUsageTypes {
  /** Last During Period */
  LastDuringPeriod = 'LAST_DURING_PERIOD',
  /** Last Ever */
  LastEver = 'LAST_EVER',
  /** Maximum */
  Maximum = 'MAXIMUM',
  /** Sum */
  Sum = 'SUM'
}

/** Response when creating an API key. Token is only shown once! */
export type ApiKeyCreated = {
  __typename?: 'ApiKeyCreated';
  /** When the API key was created. */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier for this API key. */
  id: Scalars['String']['output'];
  /** User-provided name for the API key. */
  name: Scalars['String']['output'];
  /** The plaintext API key. This is the ONLY time you will see this value! */
  token: Scalars['String']['output'];
};

/** Metadata about an API key (does not include token). */
export type ApiKeyMetadata = {
  __typename?: 'ApiKeyMetadata';
  /** When the API key was created. */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier for this API key. */
  id: Scalars['String']['output'];
  /** Last 4 characters for identification. */
  lastFourChars: Scalars['String']['output'];
  /** When the API key was last used (null if never used). */
  lastUsedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User-provided name for the API key. */
  name: Scalars['String']['output'];
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export enum BankAccountHolderTypes {
  /** Company */
  Company = 'COMPANY',
  /** Individual */
  Individual = 'INDIVIDUAL'
}

export enum BankAccountTypes {
  /** Checking */
  Checking = 'CHECKING',
  /** Savings */
  Savings = 'SAVINGS'
}

export enum BillingSchemes {
  /** Flat fee */
  FlatFee = 'FLAT_FEE',
  /** Per unit */
  PerUnit = 'PER_UNIT',
  /** Stairstep */
  Stairstep = 'STAIRSTEP',
  /** Tiered */
  Tiered = 'TIERED',
  /** Volume */
  Volume = 'VOLUME'
}

/** Represents a boolean result. */
export type BooleanResult = {
  __typename?: 'BooleanResult';
  /** The boolean result. */
  result?: Maybe<Scalars['Boolean']['output']>;
};

export enum CardFundingTypes {
  /** Credit */
  Credit = 'CREDIT',
  /** Debit */
  Debit = 'DEBIT',
  /** Prepaid */
  Prepaid = 'PREPAID',
  /** Unknown */
  Unknown = 'UNKNOWN'
}

export enum CardTypes {
  /** American Express */
  AmericanExpress = 'AMERICAN_EXPRESS',
  /** Diners Club */
  DinersClub = 'DINERS_CLUB',
  /** Discover */
  Discover = 'DISCOVER',
  /** MasterCard */
  MasterCard = 'MASTER_CARD',
  /** Unknown */
  Unknown = 'UNKNOWN',
  /** Visa */
  Visa = 'VISA'
}

/** Represents a filtered range of date/time values, in UTC format. */
export type DateRangeFilter = {
  /** Starting value of date range. */
  from?: InputMaybe<Scalars['DateTime']['input']>;
  /** Ending value of date range. */
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Represents an entity reference. */
export type EntityReference = {
  __typename?: 'EntityReference';
  /** The ID of the entity. */
  id: Scalars['ID']['output'];
};

/** Represents an entity reference filter. */
export type EntityReferenceFilter = {
  /** The ID of the entity. */
  id: Scalars['ID']['input'];
};

/** Represents an entity reference. */
export type EntityReferenceInput = {
  /** The ID of the entity. */
  id: Scalars['ID']['input'];
};

/** Entity state */
export enum EntityState {
  /** Approved */
  Approved = 'APPROVED',
  /** Archived */
  Archived = 'ARCHIVED',
  /** Changed */
  Changed = 'CHANGED',
  /** Classified */
  Classified = 'CLASSIFIED',
  /** Closed */
  Closed = 'CLOSED',
  /** Created */
  Created = 'CREATED',
  /** Deleted */
  Deleted = 'DELETED',
  /** Disabled */
  Disabled = 'DISABLED',
  /** Enabled */
  Enabled = 'ENABLED',
  /** Enriched */
  Enriched = 'ENRICHED',
  /** Errored */
  Errored = 'ERRORED',
  /** Extracted */
  Extracted = 'EXTRACTED',
  /** Finished */
  Finished = 'FINISHED',
  /** Indexed */
  Indexed = 'INDEXED',
  /** Ingested */
  Ingested = 'INGESTED',
  /** Initialized */
  Initialized = 'INITIALIZED',
  /** Opened */
  Opened = 'OPENED',
  /** Paused */
  Paused = 'PAUSED',
  /** Pending */
  Pending = 'PENDING',
  /** Prepared */
  Prepared = 'PREPARED',
  /** Queued */
  Queued = 'QUEUED',
  /** Rejected */
  Rejected = 'REJECTED',
  /** Resolved */
  Resolved = 'RESOLVED',
  /** Restarted */
  Restarted = 'RESTARTED',
  /** Running */
  Running = 'RUNNING',
  /** Sanitized */
  Sanitized = 'SANITIZED',
  /** Subscribed */
  Subscribed = 'SUBSCRIBED'
}

/** Represents an environment. */
export type Environment = {
  __typename?: 'Environment';
  /** The creation date of the environment. */
  creationDate: Scalars['DateTime']['output'];
  /** The ID of the environment. */
  id: Scalars['ID']['output'];
  /** The secret for signing JWTs for the Data API. */
  jwtSecret?: Maybe<Scalars['String']['output']>;
  /** The modified date of the environment. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** The name of the environment. */
  name: Scalars['String']['output'];
  /** The owner of the environment. */
  owner: Owner;
  /** The cloud platform (Azure, AWS, GCP) where environment was provisioned. */
  platform?: Maybe<ResourceConnectorTypes>;
  /** The cloud platform region where environment was provisioned. */
  region?: Maybe<Scalars['String']['output']>;
  /** The relevance score of the environment. */
  relevance?: Maybe<Scalars['Float']['output']>;
  /** The state of the environment (i.e. created, finished). */
  state: EntityState;
  /** The type of environment (development, production). */
  type?: Maybe<EnvironmentTypes>;
  /** The URI to access the environment's Data API. */
  uri?: Maybe<Scalars['String']['output']>;
};

/** Represents a filter for environments. */
export type EnvironmentFilter = {
  /** Filter by creation date recent timespan. For example, a timespan of one day will return environment(s) created in the last 24 hours. */
  createdInLast?: InputMaybe<Scalars['TimeSpan']['input']>;
  /** Filter environment(s) by their creation date range. */
  creationDateRange?: InputMaybe<DateRangeFilter>;
  /** The sort direction for query results. */
  direction?: InputMaybe<OrderDirectionTypes>;
  /** Filter environment(s) by their unique ID. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Limit the number of environment(s) to be returned. Defaults to 100. */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Filter environment(s) by their modified date range. */
  modifiedDateRange?: InputMaybe<DateRangeFilter>;
  /** Filter by modified date recent timespan. For example, a timespan of one day will return environment(s) modified in the last 24 hours. */
  modifiedInLast?: InputMaybe<Scalars['TimeSpan']['input']>;
  /** Filter environment(s) by their name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Skip the specified number of environment(s) from the beginning of the result set. Only supported on keyword search. */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** The sort order for query results. */
  orderBy?: InputMaybe<OrderByTypes>;
  /** The reference to the project that the environment belongs to. */
  project?: InputMaybe<EntityReferenceFilter>;
  /** The relevance score threshold for vector and hybrid search. Results below this threshold will be filtered out. Hybrid search defaults to 0.006. Vector search defaults to 0.54, or 0.78 for OpenAI Ada-002, or 0.61 for Google embedding models. Not applicable to keyword search. */
  relevanceThreshold?: InputMaybe<Scalars['Float']['input']>;
  /** Filter environment(s) by searching for similar text. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Filter environment(s) by their states. */
  states?: InputMaybe<Array<EntityState>>;
};

/** Represents an environment. */
export type EnvironmentInput = {
  /** The name of the environment. */
  name: Scalars['String']['input'];
  /** The reference to the project that the environment belongs to. */
  project: EntityReferenceInput;
};

/** Represents an environment token. */
export type EnvironmentToken = {
  __typename?: 'EnvironmentToken';
  /** The token associated with the environment. */
  token?: Maybe<Scalars['String']['output']>;
};

/** Environment type */
export enum EnvironmentTypes {
  /** Development environment */
  Development = 'DEVELOPMENT',
  /** Production environment */
  Production = 'PRODUCTION'
}

/** Represents an environment. */
export type EnvironmentUpdateInput = {
  /** The ID of the environment to update. */
  id: Scalars['ID']['input'];
  /** The name of the environment. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an invoice. */
export type Invoice = {
  __typename?: 'Invoice';
  /** The invoice amount due, in cents. */
  amountDue?: Maybe<Scalars['Long']['output']>;
  /** The invoice amount paid, in cents. */
  amountPaid?: Maybe<Scalars['Long']['output']>;
  /** The invoice currency. */
  currency?: Maybe<Scalars['String']['output']>;
  /** The invoice description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The invoice identifier. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The invoice line items. */
  lines?: Maybe<Array<InvoiceLineItem>>;
  /** The invoice number. */
  number?: Maybe<Scalars['String']['output']>;
  /** The invoice period end date. */
  periodEndDate?: Maybe<Scalars['Date']['output']>;
  /** The invoice period start date. */
  periodStartDate?: Maybe<Scalars['Date']['output']>;
  /** The invoice status. */
  status?: Maybe<InvoiceStatus>;
  /** The invoice PDF URI. */
  uri?: Maybe<Scalars['URL']['output']>;
};

/** Represents an invoice line item. */
export type InvoiceLineItem = {
  __typename?: 'InvoiceLineItem';
  /** The price aggregate usage type. */
  aggregateUsageType?: Maybe<AggregateUsageTypes>;
  /** The invoice line item amount, in cents. */
  amount?: Maybe<Scalars['Long']['output']>;
  /** The price billing scheme. */
  billingScheme?: Maybe<BillingSchemes>;
  /** The invoice line item currency. */
  currency?: Maybe<Scalars['String']['output']>;
  /** The invoice line item description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The invoice line item identifier. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The invoice line item end date. */
  periodEndDate?: Maybe<Scalars['Date']['output']>;
  /** The invoice line item start date. */
  periodStartDate?: Maybe<Scalars['Date']['output']>;
  /** The product name. */
  productName?: Maybe<Scalars['String']['output']>;
  /** If the invoice line item is a prorated amount. */
  proration?: Maybe<Scalars['Boolean']['output']>;
  /** The invoice line item quantity. */
  quantity?: Maybe<Scalars['Long']['output']>;
  /** The invoice line item unit amount, in cents. */
  unitAmount?: Maybe<Scalars['Long']['output']>;
  /** The price usage type. */
  usageType?: Maybe<UsageTypes>;
};

export enum InvoiceStatus {
  /** Draft */
  Draft = 'DRAFT',
  /** Open */
  Open = 'OPEN',
  /** Paid */
  Paid = 'PAID',
  /** Uncollectible */
  Uncollectible = 'UNCOLLECTIBLE',
  /** Void */
  Void = 'VOID'
}

/** Represents a user membership. */
export type Membership = {
  __typename?: 'Membership';
  /** The creation date of the membership. */
  creationDate: Scalars['DateTime']['output'];
  /** The ID of the membership. */
  id: Scalars['ID']['output'];
  /** The external identifier of the user membership. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The modified date of the membership. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** The name of the membership. */
  name: Scalars['String']['output'];
  /** The owner of the membership. */
  owner: Owner;
  /** The relevance score of the membership. */
  relevance?: Maybe<Scalars['Float']['output']>;
  /** The role of the user in the organization. */
  role?: Maybe<RoleTypes>;
  /** The state of the membership (i.e. created, finished). */
  state: EntityState;
  /** The user associated with the membership. */
  user?: Maybe<User>;
};

/** Represents a filter for user memberships. */
export type MembershipFilter = {
  /** Filter by creation date recent timespan. For example, a timespan of one day will return membership(s) created in the last 24 hours. */
  createdInLast?: InputMaybe<Scalars['TimeSpan']['input']>;
  /** Filter membership(s) by their creation date range. */
  creationDateRange?: InputMaybe<DateRangeFilter>;
  /** The sort direction for query results. */
  direction?: InputMaybe<OrderDirectionTypes>;
  /** Filter membership(s) by their unique ID. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The external identifier of the user membership. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Limit the number of membership(s) to be returned. Defaults to 100. */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Filter membership(s) by their modified date range. */
  modifiedDateRange?: InputMaybe<DateRangeFilter>;
  /** Filter by modified date recent timespan. For example, a timespan of one day will return membership(s) modified in the last 24 hours. */
  modifiedInLast?: InputMaybe<Scalars['TimeSpan']['input']>;
  /** Filter membership(s) by their name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Skip the specified number of membership(s) from the beginning of the result set. Only supported on keyword search. */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** The sort order for query results. */
  orderBy?: InputMaybe<OrderByTypes>;
  /** The relevance score threshold for vector and hybrid search. Results below this threshold will be filtered out. Hybrid search defaults to 0.006. Vector search defaults to 0.54, or 0.78 for OpenAI Ada-002, or 0.61 for Google embedding models. Not applicable to keyword search. */
  relevanceThreshold?: InputMaybe<Scalars['Float']['input']>;
  /** Filter membership(s) by searching for similar text. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Filter membership(s) by their states. */
  states?: InputMaybe<Array<EntityState>>;
};

/** Represents a user membership. */
export type MembershipInput = {
  /** The external identifier of the user membership. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** The name of the membership. */
  name: Scalars['String']['input'];
  /** The role of the user in the organization. */
  role: RoleTypes;
  /** The user associated with the membership. */
  user: EntityReferenceInput;
};

/** Represents a user membership. */
export type MembershipUpdateInput = {
  /** The ID of the membership to update. */
  id: Scalars['ID']['input'];
  /** The name of the membership. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The role of the user in the organization. */
  role?: InputMaybe<RoleTypes>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new API key for programmatic access. */
  createApiKey?: Maybe<ApiKeyCreated>;
  /** Creates a project environment. */
  createEnvironment?: Maybe<Environment>;
  /** Creates a project. */
  createProject?: Maybe<Project>;
  /** Deletes a project environment. */
  deleteEnvironment?: Maybe<Environment>;
  /** Deletes a project. */
  deleteProject?: Maybe<Project>;
  /** Disables a project. */
  disableProject?: Maybe<Project>;
  /** Enables a project. */
  enableProject?: Maybe<Project>;
  /** Fixes an organization. */
  fixOrganization?: Maybe<Organization>;
  /** Fix a project. */
  fixProject?: Maybe<Project>;
  /** Generates a project environment token for accessing the Data API. */
  generateEnvironmentToken?: Maybe<EnvironmentToken>;
  /** Regenerates the JWT signing secret for a project environment. */
  regenerateEnvironmentSecret?: Maybe<Environment>;
  /** Revokes an API key. */
  revokeApiKey?: Maybe<Organization>;
  /** Setup organization billing. */
  setupOrganizationBilling?: Maybe<OrganizationBilling>;
  /** Updates a project environment. */
  updateEnvironment?: Maybe<Environment>;
  /** Updates a project. */
  updateProject?: Maybe<Project>;
  /** Updates a project subscription. */
  updateProjectSubscription?: Maybe<Project>;
  /** Upgrades a project subscription to Pay-As-You-Go pricing. */
  upgradePayAsYouGo?: Maybe<Project>;
};


export type MutationCreateApiKeyArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateEnvironmentArgs = {
  environment: EnvironmentInput;
};


export type MutationCreateProjectArgs = {
  project: ProjectInput;
};


export type MutationDeleteEnvironmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDisableProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEnableProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationFixOrganizationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationFixProjectArgs = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};


export type MutationGenerateEnvironmentTokenArgs = {
  id: Scalars['ID']['input'];
  role?: InputMaybe<RoleTypes>;
};


export type MutationRegenerateEnvironmentSecretArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRevokeApiKeyArgs = {
  keyId: Scalars['String']['input'];
};


export type MutationSetupOrganizationBillingArgs = {
  cancelUri: Scalars['URL']['input'];
  successUri: Scalars['URL']['input'];
};


export type MutationUpdateEnvironmentArgs = {
  environment: EnvironmentUpdateInput;
};


export type MutationUpdateProjectArgs = {
  project: ProjectUpdateInput;
};


export type MutationUpdateProjectSubscriptionArgs = {
  id: Scalars['ID']['input'];
  productIdentifier: Scalars['String']['input'];
};


export type MutationUpgradePayAsYouGoArgs = {
  id: Scalars['ID']['input'];
};

/** Order by type */
export enum OrderByTypes {
  /** Order by creation date */
  CreationDate = 'CREATION_DATE',
  /** Order by name */
  Name = 'NAME',
  /** Order by original date */
  OriginalDate = 'ORIGINAL_DATE',
  /** Order by relevance */
  Relevance = 'RELEVANCE'
}

/** Order direction type */
export enum OrderDirectionTypes {
  /** Order ascending */
  Ascending = 'ASCENDING',
  /** Order descending */
  Descending = 'DESCENDING'
}

/** Represents an organization. */
export type Organization = {
  __typename?: 'Organization';
  /** The API keys for programmatic access. */
  apiKeys?: Maybe<Array<Maybe<ApiKeyMetadata>>>;
  /** The billing email of the organization. */
  billingEmail?: Maybe<Scalars['String']['output']>;
  /** The billing identifier of the organization. */
  billingIdentifier?: Maybe<Scalars['String']['output']>;
  /** The creation date of the organization. */
  creationDate: Scalars['DateTime']['output'];
  /** The description of the organization. */
  description?: Maybe<Scalars['String']['output']>;
  /** The ID of the organization. */
  id: Scalars['ID']['output'];
  /** The external identifier of the organization. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The user memberships associated with the organization. */
  memberships?: Maybe<Array<Maybe<Membership>>>;
  /** The modified date of the organization. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** The name of the organization. */
  name: Scalars['String']['output'];
  /** The owner of the organization. */
  owner: Owner;
  /** The organization payment methods. */
  paymentMethods?: Maybe<Array<Maybe<PaymentMethod>>>;
  /** The projects associated with the organization. */
  projects?: Maybe<Array<Maybe<Project>>>;
  /** The organization project quota limits. */
  quota?: Maybe<OrganizationQuota>;
  /** The relevance score of the organization. */
  relevance?: Maybe<Scalars['Float']['output']>;
  /** The state of the organization (i.e. created, finished). */
  state: EntityState;
  /** The users that are members of the organization. */
  users?: Maybe<Array<Maybe<User>>>;
};

/** Represents the organization billing session. */
export type OrganizationBilling = {
  __typename?: 'OrganizationBilling';
  /** The organization billing session. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The organization billing redirect URL. */
  redirectUrl?: Maybe<Scalars['URL']['output']>;
  /** The setup intent for saving payment methods. */
  setupIntent?: Maybe<SetupIntent>;
};

/** Represents a filter for organizations. */
export type OrganizationFilter = {
  /** Filter by creation date recent timespan. For example, a timespan of one day will return organization(s) created in the last 24 hours. */
  createdInLast?: InputMaybe<Scalars['TimeSpan']['input']>;
  /** Filter organization(s) by their creation date range. */
  creationDateRange?: InputMaybe<DateRangeFilter>;
  /** The sort direction for query results. */
  direction?: InputMaybe<OrderDirectionTypes>;
  /** Filter organization(s) by their unique ID. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Filter organizations by their external identifier. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Limit the number of organization(s) to be returned. Defaults to 100. */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Filter organization(s) by their modified date range. */
  modifiedDateRange?: InputMaybe<DateRangeFilter>;
  /** Filter by modified date recent timespan. For example, a timespan of one day will return organization(s) modified in the last 24 hours. */
  modifiedInLast?: InputMaybe<Scalars['TimeSpan']['input']>;
  /** Filter organization(s) by their name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Skip the specified number of organization(s) from the beginning of the result set. Only supported on keyword search. */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** The sort order for query results. */
  orderBy?: InputMaybe<OrderByTypes>;
  /** The relevance score threshold for vector and hybrid search. Results below this threshold will be filtered out. Hybrid search defaults to 0.006. Vector search defaults to 0.54, or 0.78 for OpenAI Ada-002, or 0.61 for Google embedding models. Not applicable to keyword search. */
  relevanceThreshold?: InputMaybe<Scalars['Float']['input']>;
  /** Filter organization(s) by searching for similar text. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Filter organization(s) by their states. */
  states?: InputMaybe<Array<EntityState>>;
};

/** Represents an organization. */
export type OrganizationInput = {
  /** The description of the organization. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The external identifier of the organization. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** The name of the organization. */
  name: Scalars['String']['input'];
};

/** Represents the organization project quota limits. */
export type OrganizationQuota = {
  __typename?: 'OrganizationQuota';
  /** The maximum number of free-tier projects. null = default (2), 0 = unlimited, N = specific limit. */
  maxFreeProjects?: Maybe<Scalars['Int']['output']>;
  /** The maximum number of paid-tier projects. null = default (10), 0 = unlimited, N = specific limit. */
  maxPaidProjects?: Maybe<Scalars['Int']['output']>;
};

/** Represents organization query results. */
export type OrganizationResults = {
  __typename?: 'OrganizationResults';
  /** The list of organization query results. */
  results?: Maybe<Array<Organization>>;
};

/** Represents an organization. */
export type OrganizationUpdateInput = {
  /** The billing email of the organization. */
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  /** The billing identifier of the organization. */
  billingIdentifier?: InputMaybe<Scalars['String']['input']>;
  /** The description of the organization. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the organization to update. */
  id: Scalars['ID']['input'];
  /** The name of the organization. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an entity owner. */
export type Owner = {
  __typename?: 'Owner';
  /** The tenant identifier. */
  id: Scalars['ID']['output'];
};

/** Represents the payment method. */
export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  /** The bank account holder type. */
  accountHolderType?: Maybe<BankAccountHolderTypes>;
  /** The bank account type. */
  accountType?: Maybe<BankAccountTypes>;
  /** The bank account name. */
  bankName?: Maybe<Scalars['String']['output']>;
  /** The card type. */
  cardType?: Maybe<CardTypes>;
  /** The Link user email address. */
  email?: Maybe<Scalars['String']['output']>;
  /** The card expiry month (two digits). */
  expiresMonth?: Maybe<Scalars['Int']['output']>;
  /** The card expiry year (four digits). */
  expiresYear?: Maybe<Scalars['Int']['output']>;
  /** The card funding type. */
  fundingType?: Maybe<CardFundingTypes>;
  /** The payment method identifier. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** True if payment method is default for organization. */
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  /** The last four digits of the card. */
  lastFour?: Maybe<Scalars['String']['output']>;
  /** The payment method type. */
  methodType?: Maybe<PaymentMethodTypes>;
};

export enum PaymentMethodTypes {
  /** US Bank Account */
  BankAccount = 'BANK_ACCOUNT',
  /** Card */
  Card = 'CARD',
  /** Stripe Link */
  Link = 'LINK'
}

export enum PeriodUnits {
  /** Daily */
  Day = 'DAY',
  /** Monthly */
  Month = 'MONTH',
  /** Weekly */
  Week = 'WEEK',
  /** Yearly */
  Year = 'YEAR'
}

/** Represents a product price. */
export type Price = {
  __typename?: 'Price';
  /** The price aggregate usage type. */
  aggregateUsageType?: Maybe<AggregateUsageTypes>;
  /** The price billing scheme. */
  billingScheme?: Maybe<BillingSchemes>;
  /** The price currency. */
  currency?: Maybe<Scalars['String']['output']>;
  /** The price identifier. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The price name. */
  name?: Maybe<Scalars['String']['output']>;
  /** The price period (i.e. every 1 month). */
  period?: Maybe<Scalars['Int']['output']>;
  /** The price period unit (i.e. month, year). */
  periodUnit?: Maybe<PeriodUnits>;
  /** The price, in cents. */
  price?: Maybe<Scalars['Long']['output']>;
  /** The price usage type. */
  usageType?: Maybe<UsageTypes>;
};

/** Represents a product. */
export type Product = {
  __typename?: 'Product';
  /** The product description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The product features. */
  features?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The product identifier. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The product name. */
  name?: Maybe<Scalars['String']['output']>;
  /** The product prices. */
  prices?: Maybe<Array<Price>>;
  /** The product unit. */
  unit?: Maybe<ProductUnits>;
};

/** Represents product query results. */
export type ProductResults = {
  __typename?: 'ProductResults';
  /** The list of product query results. */
  results?: Maybe<Array<Product>>;
};

export enum ProductUnits {
  /** Credit */
  Credit = 'CREDIT',
  /** Unit */
  Unit = 'UNIT'
}

/** Represents a project. */
export type Project = {
  __typename?: 'Project';
  /** The creation date of the project. */
  creationDate: Scalars['DateTime']['output'];
  /** The description of the project. */
  description?: Maybe<Scalars['String']['output']>;
  /** The environments associated with the project. */
  environments?: Maybe<Array<Maybe<Environment>>>;
  /** The ID of the project. */
  id: Scalars['ID']['output'];
  /** The subscription invoices. */
  invoices?: Maybe<Array<Maybe<Invoice>>>;
  /** The modified date of the project. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** The name of the project. */
  name: Scalars['String']['output'];
  /** The owner of the project. */
  owner: Owner;
  /** The cloud platform (Azure, AWS, GCP) where project was provisioned. */
  platform?: Maybe<ResourceConnectorTypes>;
  /** The project quota. */
  quota?: Maybe<ProjectQuota>;
  /** The cloud platform region where project was provisioned. */
  region?: Maybe<Scalars['String']['output']>;
  /** The relevance score of the project. */
  relevance?: Maybe<Scalars['Float']['output']>;
  /** The state of the project (i.e. created, finished). */
  state: EntityState;
  /** The project billing subscription. */
  subscription?: Maybe<Subscription>;
  /** The upcoming subscription invoice. */
  upcomingInvoice?: Maybe<Invoice>;
  /** The URI to access the project's Data API. */
  uri?: Maybe<Scalars['String']['output']>;
};

/** Represents a filter for projects. */
export type ProjectFilter = {
  /** Filter by creation date recent timespan. For example, a timespan of one day will return project(s) created in the last 24 hours. */
  createdInLast?: InputMaybe<Scalars['TimeSpan']['input']>;
  /** Filter project(s) by their creation date range. */
  creationDateRange?: InputMaybe<DateRangeFilter>;
  /** The sort direction for query results. */
  direction?: InputMaybe<OrderDirectionTypes>;
  /** Filter project(s) by their unique ID. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Limit the number of project(s) to be returned. Defaults to 100. */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Filter project(s) by their modified date range. */
  modifiedDateRange?: InputMaybe<DateRangeFilter>;
  /** Filter by modified date recent timespan. For example, a timespan of one day will return project(s) modified in the last 24 hours. */
  modifiedInLast?: InputMaybe<Scalars['TimeSpan']['input']>;
  /** Filter project(s) by their name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Skip the specified number of project(s) from the beginning of the result set. Only supported on keyword search. */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** The sort order for query results. */
  orderBy?: InputMaybe<OrderByTypes>;
  /** Filter projects by their cloud platform. */
  platform?: InputMaybe<ResourceConnectorTypes>;
  /** Filter projects by their cloud platform region. */
  region?: InputMaybe<Scalars['String']['input']>;
  /** The relevance score threshold for vector and hybrid search. Results below this threshold will be filtered out. Hybrid search defaults to 0.006. Vector search defaults to 0.54, or 0.78 for OpenAI Ada-002, or 0.61 for Google embedding models. Not applicable to keyword search. */
  relevanceThreshold?: InputMaybe<Scalars['Float']['input']>;
  /** Filter project(s) by searching for similar text. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Filter project(s) by their states. */
  states?: InputMaybe<Array<EntityState>>;
};

/** Represents a project. */
export type ProjectInput = {
  /** The description of the project. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the project. */
  name: Scalars['String']['input'];
  /** The cloud platform (Azure, AWS, GCP) where project will be provisioned. */
  platform: ResourceConnectorTypes;
  /** The cloud platform region where project will be provisioned. */
  region: Scalars['String']['input'];
};

/** Represents the project quota. */
export type ProjectQuota = {
  __typename?: 'ProjectQuota';
  /** The maximum number of contents which can be ingested. */
  contents?: Maybe<Scalars['Int']['output']>;
  /** The maximum number of conversations which can be created. */
  conversations?: Maybe<Scalars['Int']['output']>;
  /** The maximum number of credits which can be accrued. */
  credits?: Maybe<Scalars['Int']['output']>;
  /** The maximum number of feeds which can be created. */
  feeds?: Maybe<Scalars['Int']['output']>;
  /** The maximum number of posts which can be read by feeds. */
  posts?: Maybe<Scalars['Int']['output']>;
  /** The storage quota, in bytes. */
  storage?: Maybe<Scalars['Long']['output']>;
};

/** Represents a project region. */
export type ProjectRegion = {
  __typename?: 'ProjectRegion';
  /** The description of the project region. */
  description?: Maybe<Scalars['String']['output']>;
  /** The cloud platform (Azure, AWS, GCP). */
  platform?: Maybe<ResourceConnectorTypes>;
  /** The cloud platform region. */
  region?: Maybe<Scalars['String']['output']>;
};

/** Represents project query results. */
export type ProjectResults = {
  __typename?: 'ProjectResults';
  /** The list of project query results. */
  results?: Maybe<Array<Project>>;
};

/** Represents a project. */
export type ProjectUpdateInput = {
  /** The description of the project. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the project to update. */
  id: Scalars['ID']['input'];
  /** The name of the project. */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** Lists API keys for the organization. */
  listApiKeys?: Maybe<Array<Maybe<ApiKeyMetadata>>>;
  /** Fetch logged-in organization. */
  organization?: Maybe<Organization>;
  /** Get organization billing session details. */
  organizationBillingSession?: Maybe<OrganizationBilling>;
  /** Lookup an organization given its ID. */
  organizationById?: Maybe<Organization>;
  /** Lookup an organization given its Clerk identifier. */
  organizationByIdentifier?: Maybe<Organization>;
  /** Retrieves organizations based on the provided filter criteria. */
  organizations?: Maybe<OrganizationResults>;
  /** Retrieves Stripe products. */
  products?: Maybe<ProductResults>;
  /** Lookup a project given its ID. */
  project?: Maybe<Project>;
  /** Retrieves supported project regions. */
  projectRegions?: Maybe<ProjectRegion>;
  /** Retrieves projects based on the provided filter criteria. */
  projects?: Maybe<ProjectResults>;
  /** Fetch logged-in user. */
  user?: Maybe<User>;
  /** Lookup a user given its ID. */
  userById?: Maybe<User>;
  /** Lookup a user given its Clerk identifier. */
  userByIdentifier?: Maybe<User>;
  /** Retrieves users based on the provided filter criteria. */
  users?: Maybe<UserResults>;
};


export type QueryOrganizationBillingSessionArgs = {
  sessionId: Scalars['ID']['input'];
};


export type QueryOrganizationByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrganizationByIdentifierArgs = {
  identifier: Scalars['String']['input'];
};


export type QueryOrganizationsArgs = {
  filter?: InputMaybe<OrganizationFilter>;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectsArgs = {
  filter?: InputMaybe<ProjectFilter>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserByIdentifierArgs = {
  identifier: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
};

/** Resource connector type */
export enum ResourceConnectorTypes {
  /** Amazon Web Services */
  Amazon = 'AMAZON',
  /** Microsoft Azure */
  Azure = 'AZURE',
  /** Google Cloud */
  Google = 'GOOGLE'
}

/** Role type */
export enum RoleTypes {
  /** Administrator */
  Administrator = 'ADMINISTRATOR',
  /** Contributor */
  Contributor = 'CONTRIBUTOR',
  /** Owner */
  Owner = 'OWNER',
  /** Reader */
  Reader = 'READER',
  /** System Administrator */
  SystemAdministrator = 'SYSTEM_ADMINISTRATOR'
}

/** Represents a Stripe setup intent for saving payment methods. */
export type SetupIntent = {
  __typename?: 'SetupIntent';
  /** The setup intent client secret. */
  clientSecret?: Maybe<Scalars['String']['output']>;
  /** The setup intent identifier. */
  id?: Maybe<Scalars['String']['output']>;
  /** The setup intent status. */
  status?: Maybe<Scalars['String']['output']>;
};

/** Represents a list of string reults. */
export type StringResults = {
  __typename?: 'StringResults';
  /** The list of strings result. */
  results?: Maybe<Array<Scalars['String']['output']>>;
};

/** Represents a subscription. */
export type Subscription = {
  __typename?: 'Subscription';
  /** The subscription description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The subscription end date. */
  endDate?: Maybe<Scalars['Date']['output']>;
  /** The subscription identifier. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The invoice client secret for 3DS authentication. */
  invoiceClientSecret?: Maybe<Scalars['String']['output']>;
  /** The subscription period end date. */
  periodEndDate?: Maybe<Scalars['Date']['output']>;
  /** The subscription period start date. */
  periodStartDate?: Maybe<Scalars['Date']['output']>;
  /** The subscribed products. */
  products?: Maybe<Array<Product>>;
  /** The subscription start date. */
  startDate?: Maybe<Scalars['Date']['output']>;
  /** The subscription status. */
  status?: Maybe<SubscriptionStatus>;
};

export enum SubscriptionStatus {
  /** Active */
  Active = 'ACTIVE',
  /** Cancelled */
  Cancelled = 'CANCELLED',
  /** Incomplete */
  Incomplete = 'INCOMPLETE',
  /** Incomplete Expired */
  IncompleteExpired = 'INCOMPLETE_EXPIRED',
  /** Past Due */
  PastDue = 'PAST_DUE',
  /** Trialing */
  Trialing = 'TRIALING',
  /** Unpaid */
  Unpaid = 'UNPAID'
}

export enum UsageTypes {
  /** Licensed */
  Licensed = 'LICENSED',
  /** Metered */
  Metered = 'METERED'
}

/** Represents a user. */
export type User = {
  __typename?: 'User';
  /** The creation date of the user. */
  creationDate: Scalars['DateTime']['output'];
  /** The description of the user. */
  description?: Maybe<Scalars['String']['output']>;
  /** The email address of the user. */
  email?: Maybe<Scalars['String']['output']>;
  /** The family name of the user. */
  familyName?: Maybe<Scalars['String']['output']>;
  /** The given name of the user. */
  givenName?: Maybe<Scalars['String']['output']>;
  /** The ID of the user. */
  id: Scalars['ID']['output'];
  /** The external identifier of the user. */
  identifier?: Maybe<Scalars['String']['output']>;
  /** The reference to the memberships that the user belongs to. */
  memberships?: Maybe<Array<Maybe<Membership>>>;
  /** The modified date of the user. */
  modifiedDate?: Maybe<Scalars['DateTime']['output']>;
  /** The name of the user. */
  name: Scalars['String']['output'];
  /** The reference to the organizations that the user belongs to. */
  organizations?: Maybe<Array<Maybe<Organization>>>;
  /** The owner of the user. */
  owner: Owner;
  /** The phone number of the user. */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** The relevance score of the user. */
  relevance?: Maybe<Scalars['Float']['output']>;
  /** The state of the user (i.e. created, finished). */
  state: EntityState;
};

/** Represents a filter for users. */
export type UserFilter = {
  /** Filter by creation date recent timespan. For example, a timespan of one day will return user(s) created in the last 24 hours. */
  createdInLast?: InputMaybe<Scalars['TimeSpan']['input']>;
  /** Filter user(s) by their creation date range. */
  creationDateRange?: InputMaybe<DateRangeFilter>;
  /** The sort direction for query results. */
  direction?: InputMaybe<OrderDirectionTypes>;
  /** Filter users by their email address. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Filter users by their given name. */
  familyName?: InputMaybe<Scalars['String']['input']>;
  /** Filter users by their family name. */
  givenName?: InputMaybe<Scalars['String']['input']>;
  /** Filter user(s) by their unique ID. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Filter users by their external identifier. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Limit the number of user(s) to be returned. Defaults to 100. */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Filter user(s) by their modified date range. */
  modifiedDateRange?: InputMaybe<DateRangeFilter>;
  /** Filter by modified date recent timespan. For example, a timespan of one day will return user(s) modified in the last 24 hours. */
  modifiedInLast?: InputMaybe<Scalars['TimeSpan']['input']>;
  /** Filter user(s) by their name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Skip the specified number of user(s) from the beginning of the result set. Only supported on keyword search. */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** The sort order for query results. */
  orderBy?: InputMaybe<OrderByTypes>;
  /** Filter users by their phone numbers. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  /** The relevance score threshold for vector and hybrid search. Results below this threshold will be filtered out. Hybrid search defaults to 0.006. Vector search defaults to 0.54, or 0.78 for OpenAI Ada-002, or 0.61 for Google embedding models. Not applicable to keyword search. */
  relevanceThreshold?: InputMaybe<Scalars['Float']['input']>;
  /** Filter user(s) by searching for similar text. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Filter user(s) by their states. */
  states?: InputMaybe<Array<EntityState>>;
};

/** Represents a user. */
export type UserInput = {
  /** The description of the user. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The email address of the user. */
  email: Scalars['String']['input'];
  /** The family name of the user. */
  familyName: Scalars['String']['input'];
  /** The given name of the user. */
  givenName: Scalars['String']['input'];
  /** The external identifier of the user. */
  identifier: Scalars['String']['input'];
  /** The name of the user. */
  name: Scalars['String']['input'];
  /** The phone number of the user. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

/** Represents user query results. */
export type UserResults = {
  __typename?: 'UserResults';
  /** The list of user query results. */
  results?: Maybe<Array<User>>;
};

/** Represents a user. */
export type UserUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  /** The email address of the user. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The family name of the user. */
  familyName?: InputMaybe<Scalars['String']['input']>;
  /** The given name of the user. */
  givenName?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the user to update. */
  id: Scalars['ID']['input'];
  /** The name of the user. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The phone number of the user. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type GetOrganizationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', id: string, name: string, identifier?: string | null, state: EntityState, creationDate: any } | null };

export type CreateProjectMutationVariables = Exact<{
  project: ProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id: string, name: string, description?: string | null, state: EntityState, platform?: ResourceConnectorTypes | null, region?: string | null, uri?: string | null, creationDate: any, modifiedDate?: any | null } | null };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'Project', id: string, name: string, state: EntityState } | null };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name: string, description?: string | null, state: EntityState, platform?: ResourceConnectorTypes | null, region?: string | null, uri?: string | null, creationDate: any, modifiedDate?: any | null, owner: { __typename?: 'Owner', id: string }, quota?: { __typename?: 'ProjectQuota', credits?: number | null, contents?: number | null, feeds?: number | null, conversations?: number | null, storage?: any | null } | null, environments?: Array<{ __typename?: 'Environment', id: string, name: string, type?: EnvironmentTypes | null, state: EntityState, jwtSecret?: string | null, uri?: string | null } | null> | null, subscription?: { __typename?: 'Subscription', status?: SubscriptionStatus | null, identifier?: string | null, description?: string | null, products?: Array<{ __typename?: 'Product', name?: string | null, identifier?: string | null }> | null } | null } | null };

export type GetProjectInvoicesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectInvoicesQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name: string, invoices?: Array<{ __typename?: 'Invoice', status?: InvoiceStatus | null, periodStartDate?: any | null, periodEndDate?: any | null, amountDue?: any | null, amountPaid?: any | null, number?: string | null, uri?: any | null, currency?: string | null } | null> | null, upcomingInvoice?: { __typename?: 'Invoice', status?: InvoiceStatus | null, periodStartDate?: any | null, periodEndDate?: any | null, amountDue?: any | null, amountPaid?: any | null, number?: string | null, uri?: any | null, currency?: string | null, lines?: Array<{ __typename?: 'InvoiceLineItem', description?: string | null, identifier?: string | null, amount?: any | null, currency?: string | null, quantity?: any | null, unitAmount?: any | null, proration?: boolean | null, productName?: string | null, billingScheme?: BillingSchemes | null, usageType?: UsageTypes | null, aggregateUsageType?: AggregateUsageTypes | null, periodStartDate?: any | null, periodEndDate?: any | null }> | null } | null } | null };

export type QueryProjectsQueryVariables = Exact<{
  filter?: InputMaybe<ProjectFilter>;
}>;


export type QueryProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectResults', results?: Array<{ __typename?: 'Project', id: string, name: string, description?: string | null, state: EntityState, platform?: ResourceConnectorTypes | null, region?: string | null, uri?: string | null, creationDate: any, modifiedDate?: any | null, owner: { __typename?: 'Owner', id: string }, quota?: { __typename?: 'ProjectQuota', credits?: number | null, contents?: number | null, feeds?: number | null, conversations?: number | null, storage?: any | null } | null, environments?: Array<{ __typename?: 'Environment', id: string, name: string, type?: EnvironmentTypes | null, state: EntityState, jwtSecret?: string | null, uri?: string | null } | null> | null, subscription?: { __typename?: 'Subscription', status?: SubscriptionStatus | null, identifier?: string | null, description?: string | null, products?: Array<{ __typename?: 'Product', name?: string | null, identifier?: string | null }> | null } | null }> | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  project: ProjectUpdateInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id: string, name: string, description?: string | null, state: EntityState, platform?: ResourceConnectorTypes | null, region?: string | null, uri?: string | null, creationDate: any, modifiedDate?: any | null } | null };

export type UpdateProjectSubscriptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productIdentifier: Scalars['String']['input'];
}>;


export type UpdateProjectSubscriptionMutation = { __typename?: 'Mutation', updateProjectSubscription?: { __typename?: 'Project', id: string, name: string, subscription?: { __typename?: 'Subscription', identifier?: string | null, status?: SubscriptionStatus | null } | null } | null };

export type UpgradePayAsYouGoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UpgradePayAsYouGoMutation = { __typename?: 'Mutation', upgradePayAsYouGo?: { __typename?: 'Project', id: string, name: string, subscription?: { __typename?: 'Subscription', identifier?: string | null, status?: SubscriptionStatus | null } | null } | null };
