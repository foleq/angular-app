using AngularApp.Models;
using System.Web.Mvc;

namespace AngularApp.Controllers
{
    public class HomeController : Controller
    {
        private IMessageProvider _messageProvider;

        public HomeController(IMessageProvider messageProvider)
        {
            _messageProvider = messageProvider;
        }

        public ActionResult Index()
        {
            ViewBag.Message = _messageProvider.GetMessage();
            return View();
        }
    } 
}