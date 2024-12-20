/**
 * Verify the environment has been configured properly.
 */
const REQUIRED_ENV_VARS = ["FLATFILE_ENVIRONMENT_ID", "FLATFILE_BEARER_TOKEN"];
for (const envVar of REQUIRED_ENV_VARS) {
  if (!process.env[envVar]) {
    throw new Error(`Missing \`${envVar}\` environment variable.`);
  }
}

if (!process.env.AGENT_INTERNAL_URL) {
  process.env.AGENT_INTERNAL_URL = "https://platform.flatfile.com/api";
}

if (!process.env.FLATFILE_BEARER_TOKEN) {
  process.env.FLATFILE_BEARER_TOKEN = process.env.FLATFILE_API_KEY;
}

jest.retryTimes(2, { logErrorsBeforeRetry: true });
