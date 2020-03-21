export async function errorHandling(ctx, next) {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500
    ctx.status = err.status

    ctx.body = {
      error: {
        status: ctx.status,
        message: err.message
      }
    }
  }
}