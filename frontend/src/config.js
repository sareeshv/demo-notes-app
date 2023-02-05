const config = {
    // Backend config
    s3: {
        REGION: process.env.REACT_APP_REGION,
        BUCKET: process.env.REACT_APP_BUCKET,
    },
    apiGateway: {
        REGION: process.env.REACT_APP_REGION,
        URL: process.env.REACT_APP_API_URL,
    },
    cognito: {
        REGION: process.env.REACT_APP_REGION,
        USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
        APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
        IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
    },
    MAX_ATTACHMENT_SIZE: 5000000,
    STRIPE_KEY: "pk_test_51MTmowCKB1aHrLhToxTa9KqqUhf9JttynRGaubArWPHQTj4GDBlfoy7la6UmObE2zVOmSX1FnfZ3xpkb4E5SsjDR00ar3FJYEx",
};

SENTRY_DSN: Sentry.init({
    dsn: "https://d4d506c670d34a67ad84b93d14ec8ebc@o4504627963428864.ingest.sentry.io/4504627969982464",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

export default config;