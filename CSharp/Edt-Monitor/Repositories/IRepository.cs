using Edt_Monitor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Edt_Monitor.Repositories
{
	public interface IMessageRepository
	{
		void Add(OscMessage obj);
		
		IEnumerable<OscMessage> FindFromCache(DateTime fromTime, DateTime toTime);

		IEnumerable<OscMessage> FindRunById(long id);
		IEnumerable<OscMessage> FindRun(DateTime fromTime, DateTime toTime);
		IEnumerable<OscMessage> FindRun(DateTime fromTime, DateTime toTime, string oscAddress);

		IEnumerable<MessageRun> Summary();
	}
}
