/*
 * Edt Broadcaster v1
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SharpOSC;

namespace Edt_Broadcaster_v1
{
	class Program
	{
		static DateTime previous;
		static int messagesPerSecond = 0;

		static void Main(string[] args)
		{
			while (true)
			{
				previous = DateTime.Now;

				// The cabllback function
				HandleOscPacket callback = delegate (OscPacket packet)
				{
					var messageReceived = (OscMessage)packet;

					//Console.WriteLine(messageReceived.Address + " - "  + string.Join(",",messageReceived.Arguments));

					messagesPerSecond++;

					if(DateTime.Now.Subtract(previous).TotalSeconds >= 1)
					{
						previous = DateTime.Now;

						Console.WriteLine("Messages per second: " + messagesPerSecond + ". Time per message: " + (1000.0 / messagesPerSecond) + " ms.");

						messagesPerSecond = 0;
					}
				};

				var listener = new UDPListener(9000, callback);

				Console.WriteLine("Press enter to stop");
				Console.ReadLine();
				listener.Close();
			}
		}
	}
}
