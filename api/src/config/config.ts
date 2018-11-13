const devConfig = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT || '4040')
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT || '27017'),
        name: process.env.DEV_DB_NAME || 'library'
    }
};

export const config = devConfig;
