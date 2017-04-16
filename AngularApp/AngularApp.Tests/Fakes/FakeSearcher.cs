using AngularApp.Models;
using AngularApp.Repositories;
using System.Collections.Generic;

namespace AngularApp.Tests.Fakes
{
    public class FakeSearcher : ISearcher<ItemResult>
    {
        private List<string> Items;

        public FakeSearcher()
        {
            Items = GenerateItems(100000);
        }

        private List<string> GenerateItems(int itemsCount)
        {
            var items = new List<string>();
            for (var i = 0; i < itemsCount; i++)
            {
                items.Add(string.Format("Document {0}", i));
            }
            return items;
        }

        public ItemResult Fetch(SearchParameters parameters)
        {
            return new ItemResult()
            {
                Items = Items.GetRange(parameters.Offset, parameters.NumberOfItems)
            };
        }
    }
}
