using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QandA.Data.Models;
using System.Xml.Serialization;

namespace QandA.Data.Models
{
    public class InitialApiMessage
    {
        public InitialApiMessage() { }
        //        [XmlAttribute("message")]
        public string WelcomeMessage { get; set; }
    }
}