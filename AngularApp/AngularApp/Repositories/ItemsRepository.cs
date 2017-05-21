using AngularApp.Models;
using AngularApp.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApp.Repositories
{
    public interface IItemsRepository
    {
        ItemResult FetchItems(SearchParameters parameters);
        ItemResult FetchItemsInParallel(SearchParameters parameters);
    }

    public class ItemsRepository : IItemsRepository
    {
        private static object _lock = new object();
        private ISearcher<ItemResult> _searcher;
        private IConfiguration _configuration;

        public ItemsRepository(ISearcher<ItemResult> searcher, IConfiguration configuration)
        {
            _searcher = searcher;
            _configuration = configuration;
        }

        public ItemResult FetchItems(SearchParameters parameters)
        {
            return _searcher.Fetch(parameters);
        }

        public ItemResult FetchItemsInParallel(SearchParameters parameters)
        {
            if (parameters.NumberOfItems <= _configuration.MaxItemsPerRequest)
            {
                return FetchItems(parameters);
            }

            var parallelParamters = GetParallelParamters(parameters);
            var results = new List<ItemResult>();

            Parallel.For(0, _configuration.MaxThreadsInParallel, threadId =>
            {
                var batchResult = FetchItemsInThread(threadId, parallelParamters, parameters);
                lock (_lock)
                {
                    results.Add(batchResult);
                }
            });

            var result = MergeItemResults(results);
            result = RemoveUnnecessaryItems(result, parameters.NumberOfItems);
            return result;
        }

        private ParallelParamters GetParallelParamters(SearchParameters parameters)
        {
            var parallelParamters = new ParallelParamters();
            var totalNumberOfItems = parameters.NumberOfItems;
            var numberOfItemsPerThread = (totalNumberOfItems - 1) / _configuration.MaxThreadsInParallel + 1;
            var itemsPerRequest = numberOfItemsPerThread > _configuration.MaxItemsPerRequest
                    ? _configuration.MaxItemsPerRequest : numberOfItemsPerThread;
            return new ParallelParamters()
            {
                TotalNumberOfItems = totalNumberOfItems,
                NumberOfItemsPerThread = numberOfItemsPerThread,
                ItemsPerRequest = itemsPerRequest
            };
        }

        private ItemResult FetchItemsInThread(int threadId, ParallelParamters parallelParamters, SearchParameters parameters)
        {
            var batchParamters = new SearchParameters()
            {
                Offset = parameters.Offset + threadId * parallelParamters.NumberOfItemsPerThread
            };
            ItemResult result = null;

            for (var itemsLeftToProceed = parallelParamters.NumberOfItemsPerThread; itemsLeftToProceed > 0; 
                itemsLeftToProceed -= parallelParamters.ItemsPerRequest,
                batchParamters.Offset += parallelParamters.ItemsPerRequest)
            {
                var itemsToGet = itemsLeftToProceed < parallelParamters.ItemsPerRequest
                    ? itemsLeftToProceed : parallelParamters.ItemsPerRequest;
                batchParamters.NumberOfItems = itemsToGet;

                var batchResult = _searcher.Fetch(batchParamters);
                if(result == null)
                {
                    result = batchResult;
                    result.BatchNumber = threadId;
                }
                else
                {
                    result.Items.AddRange(batchResult.Items);
                }
            }
            return result;
        }

        private ItemResult MergeItemResults(List<ItemResult> results)
        {
            var sortedResults = results.OrderBy(x => x.BatchNumber).ToList();
            var result = sortedResults.FirstOrDefault();
            for (var i = 1; i < sortedResults.Count; i++)
            {
                result.Items.AddRange(sortedResults[i].Items);
            }
            return result;
        }

        private ItemResult RemoveUnnecessaryItems(ItemResult result, int expectedNumberOfItems)
        {
            var numberOfItems = result.Items.Count;
            if (numberOfItems > expectedNumberOfItems)
            {
                var numberOfItemsToRemove = result.Items.Count - expectedNumberOfItems;
                result.Items.RemoveRange(expectedNumberOfItems, numberOfItemsToRemove);
            }
            return result;
        }
    }

    public class ParallelParamters
    {
        public int TotalNumberOfItems { get; set; }
        public int NumberOfItemsPerThread { get; set; }
        public int ItemsPerRequest { get; set; }
    }
}