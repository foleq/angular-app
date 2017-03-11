using System.Web.Mvc;

namespace AngularApp.Controllers
{
    public class DirectivesController : Controller
    {
        public ActionResult Template(string moduleName, string viewName)
        {
            return PartialView(string.Format("~/Views/{0}/Templates/{1}.cshtml", moduleName, viewName));
        }
    }
}