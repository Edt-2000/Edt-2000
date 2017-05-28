using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SharpOSC;

namespace Edt_2000_OSCMonitor
{
	class Program
	{
		static void Main(string[] args)
		{
			DateTime previous = DateTime.Now;
			int messages = 0;
			int messagesProcessed = 0;

			// The cabllback function
			HandleOscPacket callback = delegate (OscPacket packet)
			{
				var messageReceived = (OscMessage)packet;

				messages++;

				if (messageReceived != null && messageReceived.Address.StartsWith("/"))
				{
					if(DateTime.Now.Subtract(previous).TotalMilliseconds > 1000)
					{
						Console.WriteLine($"Messages received: {messages - messagesProcessed} [{messagesProcessed}-{messages}].");

						previous = DateTime.Now;
						messagesProcessed = messages;
					}

					Console.WriteLine(messages + " - " + messageReceived.Address + " - " + messageReceived.OriginEP.Address + " - " + messageReceived.OriginEP.Port + " - " + string.Join(",", messageReceived.Arguments));
				}
			};
				
			var listener = new UDPListener(12345, callback);

			Console.WriteLine("Press enter to stop");
			Console.ReadLine();
			listener.Close();
		}
	}
}
