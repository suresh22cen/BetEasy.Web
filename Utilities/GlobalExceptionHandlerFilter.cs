using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace BetEasy.Utilities
{
   public class GlobalExceptionHandlerFilter : ExceptionFilterAttribute
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IModelMetadataProvider _modelMetadataProvider;
        private readonly ILogger<GlobalExceptionHandlerFilter> _logger;

        //Global Exception Handler for all APIs
        public GlobalExceptionHandlerFilter(
            IHostingEnvironment hostingEnvironment,
            IModelMetadataProvider modelMetadataProvider,
            ILogger<GlobalExceptionHandlerFilter> logger)
        {
            _hostingEnvironment = hostingEnvironment;
            _modelMetadataProvider = modelMetadataProvider;
            _logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            //If it's dev environment. ignore the errors, it will show up in dev. error page 
            if (!_hostingEnvironment.IsDevelopment())
            {
                return;
            }

            //Make sure to return internal server error with some custom error message
            //TODO: Error message codes need to be implemented with custom user friendly error message based on error codes
            context.HttpContext.Response.ContentType = "application/json";
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.HttpContext.Response.Body.WriteAsync(System.Text.ASCIIEncoding.UTF8.GetBytes("Un-expected Error has occurred, Errors have been logged to the System."));

            try
            {
                //Try and catch the error log
                _logger.LogError(context.Exception.ToString());
            }
            catch
            {

            }
        }
    }
}
