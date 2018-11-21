const devConfig = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT || '8080'),
        secret: 'ccdf9fa8-03ba-4d4a-992e-111ff4ac2514',
        use_authentication: process.env.DEV_USE_AUTHENTICATION || false
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT || '27017'),
        name: process.env.DEV_DB_NAME || 'library',
        user: process.env.DEV_DB_USER || 'user',
        password: process.env.DEV_DB_PASSWORD || 'password'
    },
    queue: {
        host: process.env.DEV_QUEUE_HOST || 'localhost',
        exchange: process.env.DEV_QUEUE_EXCHANGE || 'library',
        queue: process.env.DEV_QUEUE_QUEUE || 'mainQueue',
        user: process.env.DEV_QUEUE_USER || 'user',
        password: process.env.DEV_QUEUE_PASSWORD || 'password',
        vhost: process.env.DEV_QUEUE_VHOST || 'rabbitmq'
    }
};

export const config = devConfig;
