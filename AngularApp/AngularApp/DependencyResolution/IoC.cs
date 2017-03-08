using AngularApp.Models;
using StructureMap;

namespace AngularApp.DependencyResolution {

    public static class IoC {
        public static IContainer Initialize() {
            return new Container(c => Register(c));
        }

        private static void Register(ConfigurationExpression c)
        {
            c.AddRegistry<DefaultRegistry>();
            c.For<IMessageProvider>().Use<MessageProvider>();
        }
    }
}