# Pharmacy Finder

This application was build using Serverless Framework components. More information about Serverless Framework can be found here: [Serverless Framework](https://www.serverless.com/)

## Requirements

The following is needed to deploy this application:

- An Amazon Web Services Account
  - Sign up for one by going [here](https://aws.amazon.com/) and clicking "Create an AWS Account"
- A Serverless Framework Account
  - Sign up for on by going [here](https://app.serverless.com/)
- Node.js
  - Install Node.js by going [here](https://nodejs.org/en/) and download the stable version

## Quick Start

Install the latest version of the Serverless Framework:

```bash
npm i -g serverless
```

Create an `.env` file in the root directory. Then, add your AWS credentials to the `.env` file, like this:

```text
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
```

Add your org to `./serverless.yml`

```yml
app: pharmacy-app
org: your-org
```

In the root folder of the project, run `serverless deploy`

Next, add the API domain manually to the React application in `./site/src/config.js`. The API url can be found by going into `./api`, running `serverless info`, and copying the `url:` value.

After adding the API url, redeploy the site by going into `./site` and run `serverless deploy`.

Lastly, get the site's url by running `serverless info` in `./site` and copying the `url:` value. Go to this url to view the website.
