using SharpOSC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Edt_OscTest
{
	class Program
	{
		enum Mode
		{
			Solid = 1,
			Rainbow
		}

		static void Main(string[] args)
		{
			var udpSender = new UDPSender("192.168.1.255", 12345);

			//var i = 0;
			do
			{
				var key = Console.ReadKey();

				if (key.Key == ConsoleKey.Q)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.Rainbow, 0, 6, 50, 50, 4));
				}
				if (key.Key == ConsoleKey.W)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.Rainbow, 6, 13, 50, 50, 4));
				}
				if (key.Key == ConsoleKey.E)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.Rainbow, 13, 20, 50, 50, 4));
				}
				if (key.Key == ConsoleKey.R)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.Rainbow, 20, 29, 50, 50, 4));
				}

				if (key.Key == ConsoleKey.U)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.Solid, 0, 6, 20, 255, 255, 4));
				}
				if (key.Key == ConsoleKey.I)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.Solid, 6, 13, 50, 255, 255, 4));
				}
				if (key.Key == ConsoleKey.O)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.Solid, 13, 20, 80, 255, 255, 4));
				}
				if (key.Key == ConsoleKey.P)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.Solid, 20, 29, 120, 255, 255, 4));
				}

				if (key.Key == ConsoleKey.Spacebar)
				{
					var i = 0;
					while (++i < 10)
					{
						udpSender.Send(new OscMessage("/TP", (int)Mode.Solid, 0, 29, 0, 0, 255, 4));
						Thread.Sleep(10);
						udpSender.Send(new OscMessage("/TP", (int)Mode.Solid, 0, 29, 0, 0, 0, 255));

						Thread.Sleep(25);
					}
				}

				//i = (i + 1) % 255;
				//i = (i + 1) % 1024;

				//udpSender.Send(new OscMessage("/TP", (int)Mode.Solid, 0, 14, 50, 255, 255, 4));
				//udpSender.Send(new OscMessage("/TP", (int)Mode.Rainbow, 0, 28, 50, 10, 4));
				Console.WriteLine("ON");

				Thread.Sleep(1);

				udpSender.Send(new OscMessage("/TP", (int)Mode.Solid, 0, 29, 10, 255, 0, 127));
				Console.WriteLine("OFF");
			}

			while (true);
		}
	}
}
