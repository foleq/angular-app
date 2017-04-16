using AngularApp.Models;
using AngularApp.Repositories;
using System.Diagnostics;
using System.Web.Mvc;

namespace AngularApp.Controllers
{
    public class HomeController : Controller
    {
        private IItemsRepository _itemsRepository;

        public HomeController(IItemsRepository itemsRepository)
        {
            _itemsRepository = itemsRepository;
        }

        public ActionResult Index()
        {
            var s1 = Stopwatch.StartNew();
            var paramters = new SearchParameters()
            {
                NumberOfItems = 114,
                Offset = 0
            };
            var result = _itemsRepository.FetchItemsInParallel(paramters);
            s1.Stop();
            ViewBag.Message = string.Format("{0}s", s1.Elapsed.Seconds);

            return View();
        }
    } 
}