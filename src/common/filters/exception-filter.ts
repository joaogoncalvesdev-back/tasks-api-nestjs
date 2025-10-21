import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

 

    response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message : errorResponse !== '' ? errorResponse : 'Internal server error',
        path: request.url
    });
  }
}
