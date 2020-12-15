# Pharmacy Finder

This application was build using Serverless Framework components. More information about Serverless Framework can be found here: [Serverless Framework](https://www.serverless.com/)

## Example Site

The example site can be found in this repository's about section or by clicking [here](https://d1kkrdpandskfc.cloudfront.net/).

## Requirements

The following is needed to deploy this application:

- An Amazon Web Services Account
  - Sign up for one by going [here](https://aws.amazon.com/) and clicking "Create an AWS Account"
- A Serverless Framework Account
  - Sign up for one by going [here](https://app.serverless.com/)
    - Create an org when prompted
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

If needed, a user id and secret can be created by following the instructions [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console). When creating a user, select Programmatic access and give the user admin privileges by attaching the policy "AdministratorAccess".

Add your org to `./serverless.yml`

```yml
app: pharmacy-app
org: your-org
```

Build the site by going to `./site`, run `npm install`, and then run `npm run build`.

In the root folder of the project, run `serverless deploy`. If prompted, run `serverless login` in a separate terminal.

Next, add the API domain manually to the React application in `./site/src/config.js`. The API url can be found by going into `./api`, running `serverless info`, and copying the `url:` value.

After adding the API url, redeploy the site by going into `./site` and run `serverless deploy`.

Lastly, get the site's url by running `serverless info` in `./site` and copying the `url:` value. Go to this url to view the website.

_Note_: The site will not return any pharmacies until the DynamoDb table is populated. Pharmacy data can be found in pharmacies.csv in the root of this repository.
