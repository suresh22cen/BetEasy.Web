using BetEasy.Interfaces;
using BetEasy.ServiceAccessor;
using BetEasy.Utilities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using System;
using System.Net;

namespace BetEasy
{
    public class Startup
    {
        internal IConfiguration Configuration { get; set; }

        public Startup(IHostingEnvironment env)
        {
            //Build Configuration for dev & production settings
            var config = new ConfigurationBuilder()
                              .AddJsonFile("appsettings.json")
                              .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                              .AddEnvironmentVariables();

            Configuration = config.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            RaceConfiguration config;

            services.AddMvc(mvcConfig =>
            {
                //Add global exception handler to catch all API exceptions and return internal server error 
                mvcConfig.Filters.Add<GlobalExceptionHandlerFilter>();
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
              .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });            

            services.AddLogging();
            services.Configure<RaceConfiguration>(Configuration.GetSection("RaceConfiguration"));
            services.AddSingleton<IEventsServiceAccessor, EventsServiceAccessor>();

            config = new RaceConfiguration();
            Configuration.GetSection("RaceConfiguration").Bind(config);

            //Set DI Container for Http Client inject the end point address from config.
            services.AddHttpClient("", c =>
            {
                c.BaseAddress = new Uri(config.EndPointAddress);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            
        }
    }
}
