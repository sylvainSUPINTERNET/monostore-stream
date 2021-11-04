
import Redis from 'ioredis';


/**
 * Use this, if you use blocking cmd
 * @returns 
 */
export const redisClient = () => {
    //@ts-ignore
    return new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        username: process.env.REDIS_USERNAME
    });
}

/**
 * Use this, if you don't need to block 
 */
export const redisClientStatic =     
//@ts-ignore
 new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME
});
