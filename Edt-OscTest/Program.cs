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
            SingleSolid = 0,
            SinglePulse = 1,
            SingleSpark = 7,
            RainbowSolid = 2,
            RainbowPulse = 3,
            RainbowSpark = 8,
            VUMeter = 4,
            Twinkle = 5,
            Strobo = 6,
            DualSolid = 9,
            DualPulse = 10,
            DualSpark = 11,
            Kitt = 12
        }

        static void Main(string[] args)
        {
            //var udpSender = new UDPSender("10.0.0.255", 12345);
            var udpSender = new UDPSender("192.168.1.255", 12345);

            int strobo = 0;
            int color = 0;
            //var i = 0;
            do
            {
                var key = Console.ReadKey();

                if (key.Key == ConsoleKey.Q)
                {
                    //                                  0                      1  2    3  4    5    6
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 20, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 20, 32));

                }
                if (key.Key == ConsoleKey.W)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 40, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 40, 32));
                }
                if (key.Key == ConsoleKey.E)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 60, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 60, 32));
                }
                if (key.Key == ConsoleKey.R)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 80, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 80, 32));
                }

                if (key.Key == ConsoleKey.Y)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.RainbowSpark, 0, 127, 0, 127, 16));
                    udpSender.Send(new OscMessage("/O", (int)Mode.RainbowSpark, 0, 127, 0, 127, 16));
                }

                if (key.Key == ConsoleKey.D1)
                {
                    //                                  0                      1  2    3   4    5    6
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 20, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 255, 32));
                }
                if (key.Key == ConsoleKey.D2)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 60, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 255, 32));
                }
                if (key.Key == ConsoleKey.D3)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 255, 32));
                }
                if (key.Key == ConsoleKey.D4)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 140, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 255, 32));
                }
                if (key.Key == ConsoleKey.D5)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 180, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 255, 32));
                }
                if (key.Key == ConsoleKey.D6)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 220, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 255, 32));
                }
                if (key.Key == ConsoleKey.D7)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 10, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 255, 32));
                }
                if (key.Key == ConsoleKey.D8)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 70, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 255, 32));
                }
                if (key.Key == ConsoleKey.D9)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 140, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 255, 32));
                }
                if (key.Key == ConsoleKey.D0)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 210, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 255, 32));
                }

                ///

                if (key.Key == ConsoleKey.F1)
                {
                    //                                  0                      1  2    3   4    5    6
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                if (key.Key == ConsoleKey.F2)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 60, 255, 50, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                if (key.Key == ConsoleKey.F3)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 50, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                if (key.Key == ConsoleKey.F4)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 140, 255, 50, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                if (key.Key == ConsoleKey.F5)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 180, 255, 50, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                if (key.Key == ConsoleKey.F6)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 220, 255, 50, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                if (key.Key == ConsoleKey.F7)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 10, 255, 50, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                if (key.Key == ConsoleKey.F8)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 70, 255, 50, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                if (key.Key == ConsoleKey.F9)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 140, 255, 50, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                if (key.Key == ConsoleKey.F10)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 210, 255, 50, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }

                ///

                if (key.Key == ConsoleKey.G)
                {
                    //                                  0                      1  2    3  4  5    6
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 0, 0, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 0, 0, 255, 127));
                }

                if (key.Key == ConsoleKey.T)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 0, 0, 0, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 0, 0, 0, 127));
                }

                ///

                if (key.Key == ConsoleKey.U)
                {
                    //                                  0                      1  2    3  4    5    6
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 0, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 0, 255, 255, 127));
                }
                if (key.Key == ConsoleKey.I)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 64, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 64, 255, 255, 127));
                }
                if (key.Key == ConsoleKey.O)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 128, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 128, 255, 255, 127));
                }
                if (key.Key == ConsoleKey.P)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 192, 255, 255, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 192, 255, 255, 127));
                }

                if (key.Key == ConsoleKey.H)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 20, 255, 255, 63));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 20, 255, 255, 63));
                }
                if (key.Key == ConsoleKey.J)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 50, 255, 255, 63));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 50, 255, 255, 63));
                }
                if (key.Key == ConsoleKey.K)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 80, 255, 255, 63));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 80, 255, 255, 63));
                }
                if (key.Key == ConsoleKey.L)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 120, 255, 255, 63));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 120, 255, 255, 63));
                }

                if (key.Key == ConsoleKey.C)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.DualSpark, 0, 127, 60, 200, 127, 16));
                    udpSender.Send(new OscMessage("/O", (int)Mode.DualSpark, 0, 127, 60, 200, 127, 16));
                }

                if (key.Key == ConsoleKey.V)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SingleSpark, 0, 127, 100, 255, 255, 16));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SingleSpark, 0, 127, 100, 255, 255, 16));
                }

                if (key.Key == ConsoleKey.B)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 20, 255, 255, 1));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 20, 255, 255, 1));
                }
                if (key.Key == ConsoleKey.N)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 50, 255, 255, 1));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 50, 255, 255, 1));
                }
                if (key.Key == ConsoleKey.M)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 80, 255, 255, 1));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 80, 255, 255, 1));
                }
                if (key.Key == ConsoleKey.OemComma)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 120, 255, 255, 1));
                    udpSender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 120, 255, 255, 1));
                }

                if (key.Key == ConsoleKey.A)
                {
                    int r = 0;

                    while (r++ < 1)
                    {
                        for (var i = 0.0; i < Math.PI; i += (Math.PI / 100))
                        {
                            //                                  0                  1  2    3   4  5    6
                            udpSender.Send(new OscMessage("/L", (int)Mode.VUMeter, 0, 127, 63, 0, 128, (int)(Math.Pow(Math.Sin(i), 18) * 255)));
                            udpSender.Send(new OscMessage("/O", (int)Mode.VUMeter, 0, 127, 63, 0, 128, (int)(Math.Pow(Math.Sin(i), 18) * 255)));

                            Thread.Sleep(5);
                        }
                    }
                }

                if (key.Key == ConsoleKey.OemPeriod)
                {
                    int r = 0;

                    while (r++ < 1)
                    {
                        for (var i = 0; i <= 255; i++)
                        {
                            udpSender.Send(new OscMessage("/L", (int)Mode.Kitt, i > 127 ? 255 - i : i, 20, 98));
                            udpSender.Send(new OscMessage("/O", (int)Mode.Kitt, i > 127 ? 255 - i : i, 20, 98));

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
                            udpSender.Send(new OscMessage("/L", (int)Mode.Twinkle, 0, 127, 97, (int)(Math.Pow(Math.Sin(i), 1) * 180)));
                            udpSender.Send(new OscMessage("/O", (int)Mode.Twinkle, 0, 127, 97, (int)(Math.Pow(Math.Sin(i), 1) * 180)));

                            Thread.Sleep(20);
                        }
                    }
                }

                if (key.Key == ConsoleKey.D)
                {
                    int r = 0;
                    while (r++ < 100)
                    {
                        //                                  0                  1  2    3                                         4
                        udpSender.Send(new OscMessage("/L", (int)Mode.Twinkle, 0, 127, (int)((new Random()).NextDouble() * 255), (int)(Math.Pow(Math.Sin(r), 1) * 120)));
                        udpSender.Send(new OscMessage("/O", (int)Mode.Twinkle, 0, 127, (int)((new Random()).NextDouble() * 255), (int)(Math.Pow(Math.Sin(r), 1) * 120)));

                        Thread.Sleep(5);
                    }
                }

                if (key.Key == ConsoleKey.F)
                {
                    int r = 0;
                    while (r++ < 256)
                    {
                        udpSender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, r, 255, 255, 127));
                        udpSender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, r, 255, 255, 127));

                        Console.WriteLine(r);
                        Thread.Sleep(100);
                    }
                }
                if (key.Key == ConsoleKey.Z)
                {
                    //                                  0                  1  2    3                                         4
                    udpSender.Send(new OscMessage("/L", (int)Mode.Twinkle, 0, 127, (int)((new Random()).NextDouble() * 255), 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.Twinkle, 0, 127, (int)((new Random()).NextDouble() * 255), 127));
                }

                if (key.Key == ConsoleKey.X)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.RainbowSolid, 0, 127, 0, 127));
                    udpSender.Send(new OscMessage("/O", (int)Mode.RainbowSolid, 0, 127, 0, 127));
                }


                if (key.Key == ConsoleKey.Spacebar)
                {
                    strobo = ((strobo + 31) % 95);
                    color = ((color + 15) % 255);

                    Console.WriteLine($"S {strobo} C {color}");

                    udpSender.Send(new OscMessage("/L", (int)Mode.Strobo, color, strobo));
                    udpSender.Send(new OscMessage("/O", (int)Mode.Strobo, color, strobo));
                }
                if (key.Key == ConsoleKey.Escape)
                {
                    udpSender.Send(new OscMessage("/L", (int)Mode.Strobo, 0, 0));
                    udpSender.Send(new OscMessage("/O", (int)Mode.Strobo, 0, 0));
                }

                Console.WriteLine("ON");
            }

            while (true);
        }
    }
}
