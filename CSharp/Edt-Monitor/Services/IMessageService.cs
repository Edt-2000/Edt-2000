using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Edt_Monitor.Models;

namespace Edt_Monitor.Services
{
    public interface IMessageService : IDisposable
    {
		void Receive(EventHandler<OscMessage> callback);
    }
}
