using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Edt_Monitor.Models;

namespace Edt_Monitor.Services
{
	public interface ISimulatorService
	{
		bool IsRunning();

		void Prepare(IEnumerable<OscMessage> collection);

		DateTime Progress();
		
		void Start();
		void Stop();
	}
}
