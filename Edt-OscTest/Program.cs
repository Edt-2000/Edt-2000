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
			SingleSolid = 1,
			SinglePulse = 2,
			RainbowSolid = 3,
			RainbowPulse = 4,
			VUMeter = 100,
			Twinkle = 101,
			Strobo = 200
		}

		static void Main(string[] args)
		{
			var udpSender = new UDPSender("192.168.2.255", 12345);

			int strobo = 0;
			int color = 0;
			//var i = 0;
			do
			{
				var key = Console.ReadKey();

				if (key.Key == ConsoleKey.Q)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.RainbowPulse, 0, 6, 0, 10, 127));
				}
				if (key.Key == ConsoleKey.W)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.RainbowPulse, 6, 13, 60, 10, 127));
				}
				if (key.Key == ConsoleKey.E)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.RainbowPulse, 13, 20, 120, 10, 127));
				}
				if (key.Key == ConsoleKey.R)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.RainbowPulse, 20, 29, 180, 10, 127));
				}

				///

				if (key.Key == ConsoleKey.U)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 0, 6, 0, 255, 255, 127));
				}
				if (key.Key == ConsoleKey.I)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 6, 13, 64, 255, 255, 127));
				}
				if (key.Key == ConsoleKey.O)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 13, 20, 128, 255, 255, 127));
				}
				if (key.Key == ConsoleKey.P)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 20, 29, 192, 255, 255, 127));
				}

				if (key.Key == ConsoleKey.H)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 0, 6, 20, 255, 255, 63));
				}
				if (key.Key == ConsoleKey.J)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 6, 13, 50, 255, 255, 63));
				}
				if (key.Key == ConsoleKey.K)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 13, 20, 80, 255, 255, 63));
				}
				if (key.Key == ConsoleKey.L)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 20, 29, 120, 255, 255, 63));
				}

				if (key.Key == ConsoleKey.B)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 0, 6, 20, 255, 255, 1));
				}
				if (key.Key == ConsoleKey.N)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 6, 13, 50, 255, 255, 1));
				}
				if (key.Key == ConsoleKey.M)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 13, 20, 80, 255, 255, 1));
				}
				if (key.Key == ConsoleKey.OemComma)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.SinglePulse, 20, 29, 120, 255, 255, 1));
				}

				if (key.Key == ConsoleKey.A)
				{
					int r = 0;

					while (r++ < 10)
					{
						for (var i = 0.0; i < Math.PI; i += (Math.PI / 100))
						{
							udpSender.Send(new OscMessage("/TP", (int)Mode.VUMeter, 0, 29, 14, 0, 128, (int)(Math.Pow(Math.Sin(i), 18) * 255)));

							Thread.Sleep(5);
						}
					}
				}

				if (key.Key == ConsoleKey.S)
				{

					for (var i = 0.0; i < Math.PI; i += (Math.PI / 100))
					{
						int r = 0;

						while (r++ < 5)
						{
							udpSender.Send(new OscMessage("/TP", (int)Mode.Twinkle, 0, 29, 100, (int)(Math.Pow(Math.Sin(i), 1) * 180)));

							Thread.Sleep(50);
						}
					}
				}

				if (key.Key == ConsoleKey.Spacebar)
				{
					strobo = ((strobo + 31) % 255);
					color = ((color + 15) % 255);

					udpSender.Send(new OscMessage("/TP", (int)Mode.Strobo, color, strobo));
				}


				if (key.Key == ConsoleKey.Escape)
				{
					udpSender.Send(new OscMessage("/TP", (int)Mode.Strobo, 0, 0));
				}
				//{
				//	var i = 0;
				//	while (++i < 10)
				//	{
				//		udpSender.Send(new OscMessage("/TP", (int)Mode.SingleSolid, 0, 29, 0, 0, 255, 4));
				//		Thread.Sleep(10);
				//		udpSender.Send(new OscMessage("/TP", (int)Mode.SingleSolid, 0, 29, 0, 0, 0, 255));

				//		Thread.Sleep(25);
				//	}
				//}

				//i = (i + 1) % 255;
				//i = (i + 1) % 1024;

				//udpSender.Send(new OscMessage("/TP", (int)Mode.Solid, 0, 14, 50, 255, 255, 4));
				//udpSender.Send(new OscMessage("/TP", (int)Mode.Rainbow, 0, 28, 50, 10, 4));
				Console.WriteLine("ON");

				//Thread.Sleep(1);

				//udpSender.Send(new OscMessage("/TP", (int)Mode.Solid, 0, 29, 10, 255, 0, 127));
				//Console.WriteLine("OFF");
			}

			while (true);
		}
	}
}
