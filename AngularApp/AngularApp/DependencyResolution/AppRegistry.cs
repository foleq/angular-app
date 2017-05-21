using AngularApp.Models;
using AngularApp.Repositories;
using AngularApp.Services;
using StructureMap.Configuration.DSL;

namespace AngularApp.DependencyResolution
{
    public class AppRegistry : Registry
    {
        public AppRegistry()
        {
            For<IConfiguration>().Use<Configuration>();
            For<ISearcher<ItemResult>>().Use<TestSearcher>();
            For<IItemsRepository>().Use<ItemsRepository>();
        }
    }
}