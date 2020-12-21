using QandA.Data.Models;

namespace QandA.Data
{
    public interface IAnswerCache
    {
        AnswerGetResponse Get(int answerId);
        void Remove(int answerId);
        void Set(AnswerGetResponse answer);
    }
}