using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QandA.Data.Models
{
    public class AnswerGetManyResponse
    {
        public int AnswerId { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
    }
}
