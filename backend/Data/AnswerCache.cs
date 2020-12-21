using Microsoft.Extensions.Caching.Memory;
using QandA.Data.Models;

namespace QandA.Data
{
    public class AnswerCache : IAnswerCache
    {
        private MemoryCache _cache { get; set; }
        public AnswerCache()
        {
            _cache = new MemoryCache(new MemoryCacheOptions
            {
                SizeLimit = 100
            });
        }

        private string GetCacheKey(int answerId) => $"Answer-{answerId}";

        public AnswerGetResponse Get(int answerId)
        {
            AnswerGetResponse answer;
            _cache.TryGetValue(GetCacheKey(answerId), out answer);
            return answer;
        }

        public void Set(AnswerGetResponse answer)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSize(1);
            _cache.Set(GetCacheKey(answer.AnswerId), answer, cacheEntryOptions);
        }

        public void Remove(int answerId)
        {
            _cache.Remove(GetCacheKey(answerId));
        }
    }
}