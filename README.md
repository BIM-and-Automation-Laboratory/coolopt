# CoolOpt | DEV

:warning: In development

A web-based research prototype showcasing a combo of Linked Data + IoT + Data Interrogation + Knowledge Representation Learning.

## Development Stack

| Core                              | Tool                                          |
| --------------------------------- | --------------------------------------------- |
| Linked Building Data Model        | Resource Description Framework (RDF)          |
| Linked Building Data API          | Python (flask)                                |
| Knowledge Representation Learning | Python (pykg2vec, ampligraph)                 |
| IoT-MQTT Database                 | MongoDB                                       |
| Reinforcement Learning Model      | Pytorch (Policy-based Agent)                  |
| Client-side                       | React JS                                      |
| Server-side                       | Express, NodeJS                               |
| API-backend                       | GraphQL (capable of consuming REST) w/ Apollo |
| Database                          | Neo4j                                         |
| Authentication                    | Auth0                                         |
| External BIM APIs                 | Autodesk Forge                                |

## Getting started locally

Clone this github repository on your local machine in any directory.

```bash
git clone https://github.com/BIM-and-Automation-Laboratory/coolopt.git
```

Go to the `coolopt/client` directory and then install the client dependencies by running the command below in your terminal.

```bash
npm install
```

Make sure to provide a `.env` file for the client environment variables in the `coolopt/client` directory. The required variables are summarized below.

| Variable Name                     | Default Value                     | Usage                                        |
| --------------------------------- | --------------------------------- | -------------------------------------------- |
| `REACT_APP_GRAPHQL_URI`           | /api/graphql                      | GraphQL endpoint                             |
| `LOCAL_GQL_PROXY`                 | http://127.0.0.1:5000/api/graphql | Proxy for the GraphQL endpoint               |
| `SKIP_PREFLIGHT_CHECK`            | true                              | Disabling preflight check                    |
| `REACT_APP_AUTH0_DOMAIN`          | `<undefined>`                     | Your Auth0 domain                            |
| `REACT_APP_AUTH0_CLIENT_ID`       | `<undefined>`                     | Your Auth0 Client ID                         |
| `REACT_APP_AUTH0_AUDIENCE`        | `<undefined>`                     | Your Auth0 Audience URL                      |
| `REACT_APP_AUTH0_ROLES_NAMESPACE` | `<undefined>`                     | Your Auth0 roles namespace.                  |
| `REACT_APP_IO_PORT`               | 5001                              | Port for Socket.io connection to the backend |
| `REACT_APP_PORT`                  | 3000                              | Port for the react-app                       |

Then go to the `coolopt/server` directory and install the server dependencies by running the command below in your terminal.

```bash
npm install
```

Make sure to provide a `.env` file for the server environment variables in the `coolopt/server` directory. The required variables are summarized below.

| Variable Name                     | Default Value  | Usage                                             |
| --------------------------------- | -------------- | ------------------------------------------------- |
| `NEO4J_URI`                       | `<undefined>`  | Your Neo4h Database URI                           |
| `NEO4J_USER`                      | `<undefined>`  | Your neo4j database auth user                     |
| `NEO4J_PASSWORD`                  | `<undefined>`  | Your neo4j database password                      |
| `MONGO_URI`                       | `<undefined>`  | Your Mongo DB connection string                   |
| `MQTT_HOST`                       | `<undefined>`  | Your MQTT Server host name                        |
| `MQTT_PORT`                       | `<undefined>`  | Your MQTT Server Access Port name                 |
| `MQTT_USERNAME`                   | `<undefined>`  | Your MQTT Server auth username                    |
| `MQTT_PASSWORD`                   | `<undefined>`  | Your MQTT Password auth username                  |
| `HOST_URL`                        | 127.0.0.1      | Your GraphQL host URL                             |
| `HOST_PORT`                       | 5000           | Your GraphQL host port                            |
| `HOST_PATH`                       | `/api/graphql` | Your GraphQL host path                            |
| `JWT_SECRET`                      | `<undefined>`  | Your Auth0 JWT secret                             |
| `GCP_TYPE`                        | `<undefined>`  | Google Cloud Platform Type                        |
| `GCP_PROJECT_ID`                  | `<undefined>`  | Google Cloud Platform Project ID                  |
| `GCP_PRIVATE_KEY_ID`              | `<undefined>`  | Google Cloud Platform Private Key ID              |
| `GCP_PRIVATE_KEY`                 | `<undefined>`  | Google Cloud Platform Private Key                 |
| `GCP_CLIENT_EMAIL`                | `<undefined>`  | Google Cloud Platform Client Email                |
| `GCP_CLIENT_ID`                   | `<undefined>`  | Google Cloud Platform Client ID                   |
| `GCP_AUTH_URI`                    | `<undefined>`  | Google Cloud Platform Auth URI                    |
| `GCP_TOKEN_URI`                   | `<undefined>`  | Google Cloud Platform Token URI                   |
| `GCP_AUTH_PROVIDER_X509_CERT_URL` | `<undefined>`  | Google Cloud Platform Auth Provider X509 Cert URL |
| `GCP_CLIENT_X509_CERT_URL`        | `<undefined>`  | Google Cloud Platform Client X509 Cert URL        |

Then go to the `coolopt/lbd` directory and create a virtual environment for the encapsulated `research_modules API` to run in. Make sure you have python 3.6 already installed and use the command below to create a virtual environment called `venv`

```bash
python3 -m venv
```

When the vitual environment has been created, start it using the the instructions below.

**For windows**

First open `PowerShell` as administrator and run the command below

```
Set-ExecutionPolicy Unrestricted -Force
```

Then go back to your project folder `coolopt/lbd` and run the comman below to activate the virtual environment

```bash
.\venv\Scripts\activate
```

**For mac**

Run

```bash
source venv/bin/activate
```

When activation is successful your terminal should show `(venv)` just before your directory as shown below.

```
(venv) PS E:\your-projects\coolopt\lbd>
```

Then install all the project dependencies listed in `coolopt/lbd/requirements.txt` using this command

```
pip install -r requirements.txt
```

## Running the project

**Starting the client**: Go to the `coolopt/client` directory and start the react development server using the command below in your terminal.:

```bash
npm start
```

**Starting the server**: Go to the `coolopt/server` directory and start the development server hosting the GraphQL API using the command below in a new terminal.:

```bash
npm run server
```

**Starting the LBD API server**: Go to the `coolopt/lbd` directory and start the development flask server hosting the `LBD research_modules API` using the command below in a new terminal.:

```bash
python app.py
```

For details related to using **Google Cloud Storage** visit <https://cloud.google.com/storage>. You are free to use any other storage mechanism as you see fit

For **MQTT** related information, please visit <https://mqtt.org/> our our github repository at <https://github.com/BIM-and-Automation-Laboratory/research-mqtt-broker> to see how to setup your own.

For **Auth0** related configurations, please visit the Auth0 documentation on how to setup a tenant at <https://auth0.com/docs/quickstart/spa/react/01-login>

For **Neo4j** related configurations, please visit the Neo4j documentation on how to set up a database instance locally or on the cloud at <https://neo4j.com/developer/get-started/>

For **Forge** related configurations, please visit the Autodesk Forge Getting Started page for how to setup an Application with the Forge APIs at <https://forge.autodesk.com/developer/getting-started>

## Todos

- [x] Setup base GraphQL API for the app logic
- [x] Setup Neo4j Database for persistence
- [ ] Setup base Webpack and Babel configuration
- [x] Setup microservices and REST routes for fetching and sending building information from Autodesk Forge API
- [x] Setup Model-Derivative API forge viewer setup.
- [ ] Setup up Authentication and necessary context management
- [ ] Setup role based authentication.
- [ ] Setup local file upload to Data Management API.
- [x] Setup Linked Building Data API for translation of COBie files into semantically enriched knowledge graphs.
- [x] Setup IoT MQTT Broker config UI and sensor Data retrieval logic
- [ ] Setup API gateway for talking to Reinforcement learning Model from Python.

:warning:**Disclaimer**: Please note that this is still an ongoing project and is under heavy development prone to constant breaking changes.

## License

Pending confirmation
