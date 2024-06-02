export default function initMiddleware(middleware) {
    return async(req, res, next) => {
        try{
            await middleware(req, res, next);
            return Promise.resolve();
        }catch(error){
            return Promise.reject(error);
        }
    }
};