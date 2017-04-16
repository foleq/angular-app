using AngularApp.Services;

namespace AngularApp.Tests.Fakes
{
    public class FakeConfiguration : IConfiguration
    {
        public int MaxItemsPerRequest { get; set; }

        public int MaxThreadsInParallel { get; set; }
    }
}
