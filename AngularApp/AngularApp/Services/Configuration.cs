using System.Configuration;

namespace AngularApp.Services
{
    public interface IConfiguration
    {
        int MaxItemsPerRequest { get; }
        int MaxThreadsInParallel { get; }
    }

    public class Configuration : IConfiguration
    {
        public int MaxItemsPerRequest
        {
            get
            {
                var maxItemsPerRequestString = ConfigurationManager.AppSettings["MaxItemsPerRequest"];
                int maxItemsPerRequest;
                return int.TryParse(maxItemsPerRequestString, out maxItemsPerRequest) 
                    ? maxItemsPerRequest : 1000;
            }
        }

        public int MaxThreadsInParallel
        {
            get
            {
                var maxThreadsInParallelString = ConfigurationManager.AppSettings["MaxThreadsInParallel"];
                int maxThreadsInParallel;
                return int.TryParse(maxThreadsInParallelString, out maxThreadsInParallel)
                    ? maxThreadsInParallel : 2;
            }
        }
    }
}