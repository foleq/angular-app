using AngularApp.Models;
using AngularApp.Repositories;
using AngularApp.Tests.Extensions;
using AngularApp.Tests.Fakes;
using Machine.Specifications;

namespace AngularApp.Tests.Repositories
{
    [Subject("ItemRepository")]
    public abstract class When_fetching_items_in_parallel
    {
        protected static ItemsRepository Subject;
        protected static FakeConfiguration Configuration;
        protected static SearchParameters SearchParameters;
        protected static ItemResult ItemResult, ItemResultParallel;

        Establish context = () =>
        {
            var searcher = new FakeSearcher();
            Configuration = new FakeConfiguration();
            Subject = new ItemsRepository(searcher, Configuration);
        };

        Because of = () =>
        {
            ItemResult = Subject.FetchItems(SearchParameters);
            ItemResultParallel = Subject.FetchItemsInParallel(SearchParameters);
        };
    }

    public abstract class When_fetching_items_in_2_threads_and_100_items_per_request : When_fetching_items_in_parallel
    {
        Establish context = () =>
        {
            Configuration.MaxThreadsInParallel = 2;
            Configuration.MaxItemsPerRequest = 100;
        };
    }

    public class When_fetching_in_2_threads_1000_items_starting_from_0 : When_fetching_items_in_2_threads_and_100_items_per_request
    {
        Establish context = () =>
        {
            SearchParameters = new SearchParameters() { NumberOfItems = 1000, Offset = 0 };
        };

        It should_return_same_items_for_parallel_and_non_parallel_result = () =>
        {
            ItemResult.Items.ShouldContainOnlyInOrder(ItemResultParallel.Items);
        };
    }

    public class When_fetching_in_2_threads_999_items_starting_from_0 : When_fetching_items_in_2_threads_and_100_items_per_request
    {
        Establish context = () =>
        {
            SearchParameters = new SearchParameters() { NumberOfItems = 999, Offset = 0 };
        };

        It should_return_same_items_for_parallel_and_non_parallel_result = () =>
        {
            ItemResult.Items.ShouldContainOnlyInOrder(ItemResultParallel.Items);
        };
    }

    public class When_fetching_in_2_threads_1001_items_starting_from_0 : When_fetching_items_in_2_threads_and_100_items_per_request
    {
        Establish context = () =>
        {
            SearchParameters = new SearchParameters() { NumberOfItems = 1001, Offset = 0 };
        };

        It should_return_same_items_for_parallel_and_non_parallel_result = () =>
        {
            ItemResult.Items.ShouldContainOnlyInOrder(ItemResultParallel.Items);
        };
    }

    public abstract class When_fetching_items_in_4_threads_and_100_Items_per_request : When_fetching_items_in_parallel
    {
        Establish context = () =>
        {
            Configuration.MaxThreadsInParallel = 4;
            Configuration.MaxItemsPerRequest = 100;
        };
    }

    public class When_fetching_in_4_threads_1000_items_starting_from_55 : When_fetching_items_in_4_threads_and_100_Items_per_request
    {
        Establish context = () =>
        {
            SearchParameters = new SearchParameters() { NumberOfItems = 1000, Offset = 55 };
        };

        It should_return_same_items_for_parallel_and_non_parallel_result = () =>
        {
            ItemResult.Items.ShouldContainOnlyInOrder(ItemResultParallel.Items);
        };
    }

    public class When_fetching_in_4_threads_999_items_starting_from_55 : When_fetching_items_in_4_threads_and_100_Items_per_request
    {
        Establish context = () =>
        {
            SearchParameters = new SearchParameters() { NumberOfItems = 999, Offset = 55 };
        };

        It should_return_same_items_for_parallel_and_non_parallel_result = () =>
        {
            ItemResult.Items.ShouldContainOnlyInOrder(ItemResultParallel.Items);
        };
    }

    public class When_fetching_in_4_threads_1001_items_starting_from_55 : When_fetching_items_in_4_threads_and_100_Items_per_request
    {
        Establish context = () =>
        {
            SearchParameters = new SearchParameters() { NumberOfItems = 1001, Offset = 55 };
        };

        It should_return_same_items_for_parallel_and_non_parallel_result = () =>
        {
            ItemResult.Items.ShouldContainOnlyInOrder(ItemResultParallel.Items);
        };
    }
}