using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Edt_Monitor
{
    public static class PeriodicTask
    {
		public static async Task Run(Action<DateTime> action, TimeSpan interval, CancellationToken token)
		{
			DateTime previousCycle = DateTime.Now;

			while (!token.IsCancellationRequested)
			{
				if (interval > TimeSpan.Zero)
				{
					await Task.Delay(interval, token);
				}

				try
				{
					action.Invoke(previousCycle);
				}
				catch(Exception e)
				{
					Console.WriteLine(e.Message);
				}
				previousCycle = DateTime.Now;
			}
		}
    }
}
