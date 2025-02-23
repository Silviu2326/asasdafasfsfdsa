export interface Model {
  name: string;
  fields: {
    name: string;
    type: string;
    required: boolean;
  }[];
}

export interface Route {
  path: string;
  method: string;
  controller: string;
  action: string;
  options?: {
    middleware?: string[];
    auth?: boolean;
    rateLimit?: boolean;
    cache?: boolean;
    validation?: boolean;
    docs?: {
      summary?: string;
      description?: string;
      tags?: string[];
    };
  };
}

export interface Controller {
  name: string;
  actions: string[];
  options?: {
    authentication?: boolean;
    validation?: boolean;
    caching?: boolean;
    logging?: boolean;
    apiDocs?: boolean;
  };
}

export interface BackendConfig {
  database: string;
  models: Model[];
  controllers: Controller[];  // Add this line
  routes: Route[];
  features: {
    authentication: boolean;
    restApi: boolean;
    graphql: boolean;
    swagger: boolean;
    websockets: boolean;
  };
}