using AngularApp.Models;
using System.Collections.Generic;

namespace AngularApp.Repositories
{
    public class SearchParameters
    {
        public int NumberOfItems { get; set; }
        public int Offset { get; set; }
    }

    public interface ISearcher<TResult>
    {
        TResult Fetch(SearchParameters parameters);
    }

    // It could be searcher for database etc.
    public class TestSearcher : ISearcher<ItemResult>
    {
        private List<string> Items;

        public TestSearcher()
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