using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

using SharpOSC;

namespace Edt_2000_OSCGenerator
{
	class Program
	{
		static void Main(string[] args)
		{
			UDPSender sender = new UDPSender("10.0.0.255", 12345);
			int messages = 0;

			int messageRate = 1; // messages per second

			DateTime previousMessage = DateTime.Now;

			while(true)
			{
				if (DateTime.Now.Subtract(previousMessage).TotalMilliseconds > (1000 / messageRate))
				{
					previousMessage = DateTime.Now;

					OscMessage message = new OscMessage("/TK", 1.0f, 2.0f, 3.0f, 4.0f, 5.0f, 6.0f);

					sender.Send(message);

					Console.WriteLine(++messages + ": Message send!");
				}

				Thread.Sleep(1);
			}
		}
	}
}
