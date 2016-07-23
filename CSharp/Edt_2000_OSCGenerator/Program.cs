using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SharpOSC;

namespace Edt_2000_OSCGenerator
{
	class Program
	{
		static void Main(string[] args)
		{
			UDPSender sender = new UDPSender("10.0.0.200", 12345);
			int messages = 0;

			while(true)
			{
				Console.WriteLine("Message send!");

				OscMessage message = new OscMessage("/Test", 1.0f, 2.0f, 3.0f, 4.0f, 5.0f, 6.0f, ++messages);

				sender.Send(message);	
			}
		}
	}
}
