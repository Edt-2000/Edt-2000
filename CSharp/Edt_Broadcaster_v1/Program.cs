/*
 * Edt Broadcaster v1
 * 
 * This broadcaster is used for monitoring and relaying. Multicast should be enabled on all nodes sending UDP messages, making the relaying functionality superfluous.
 */
using System;
using System.Net;
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
		static int messages;
		static int messageSeen;
		
		//static string[] broadcastList = { "192.168.0.120", "192.168.0.121" };
		//static List<UDPSender> broadcastSenders = new List<UDPSender>();

		static void Main(string[] args)
		{
			/*foreach(string ip in broadcastList)
			{
				broadcastSenders.Add(new UDPSender(ip, 8000));
			}*/

            
			while (true)
			{
				previous = DateTime.Now;
				messages = 0;
				messageSeen = 0;

				// The cabllback function
				HandleOscPacket callback = delegate (OscPacket packet)
				{
					var messageReceived = (OscMessage)packet;

					messages++;

					if(DateTime.Now.Subtract(previous).TotalMilliseconds > 1000)
					{
						previous = DateTime.Now;

						Console.WriteLine(messages + " per second. " + (1000.0 / Math.Max(1,messages)) + " ms per message.");

						messages = 0;
					}

					if(messageSeen + 1 != (int) messageReceived.Arguments.Last())
					{
						Console.WriteLine("Message missed!");
					}

					messageSeen = (int)messageReceived.Arguments.Last();

					Console.WriteLine(messageReceived.Address + " - " + messageReceived.OriginEP.Address + " - " + messageReceived.OriginEP.Port + " - " + string.Join(",", messageReceived.Arguments));

					//Console.WriteLine(messageReceived.Address + " - " + messageReceived.OriginEP.Address + " - "  + messageReceived.OriginEP.Port + " - "  + string.Join(",",messageReceived.Arguments));

					/*foreach(UDPSender sender in broadcastSenders)
					{
						if(sender.Address != messageReceived.OriginEP.Address.ToString())
						{
							Console.WriteLine("Sending to " + sender.Address);

							sender.Send(messageReceived);
						}
					}*/
				};

				var listener = new UDPListener(12345, IPAddress.Parse("239.255.255.250"), callback);
                
				
				Console.WriteLine("Press enter to stop");
				Console.ReadLine();
				listener.Close();
			}
		}
	}
}
