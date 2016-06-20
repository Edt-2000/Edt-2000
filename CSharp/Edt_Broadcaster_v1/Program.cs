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
		static void Main(string[] args)
		{
			while (true)
			{
				// The cabllback function
				HandleOscPacket callback = delegate (OscPacket packet)
				{
					var messageReceived = (OscMessage)packet;

					Console.WriteLine(messageReceived.Address + " - "  + string.Join(",",messageReceived.Arguments));
				};

				var listener = new UDPListener(9000, callback);

				Console.WriteLine("Press enter to stop");
				Console.ReadLine();
				listener.Close();
			}
		}
	}
}
