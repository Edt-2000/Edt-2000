using SharpOSC;
using System;
using System.Collections.Generic;
using System.IO.Ports;
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
            //var sender = new UDPSender("10.0.0.2", 12345);
            //var sender = new UDPSender("192.168.0.102", 12345);

            var sender = new USB("COM14", 9600);

            

            int strobo = 0;
            int color = 0;
            //var i = 0;
            do
            {
                var key = Console.ReadKey();
                
                if(key.Key == ConsoleKey.Q)
                {
                    //                                  0                      1  2    3  4    5    6
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 20, 127));
                    //sender.Send(new OscMessage("/L/2", (int)Mode.SingleSolid, 0, 127, 97, 255, 20, 127));
                    //sender.Send(new OscMessage("/L/3", (int)Mode.SingleSolid, 0, 127, 97, 255, 20, 127));
                    //sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 20, 32));

                }
                else if(key.Key == ConsoleKey.W)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 40, 127));
                    //sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 40, 32));
                }
                else if(key.Key == ConsoleKey.E)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 60, 127));
                    //sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 60, 32));
                }
                else if(key.Key == ConsoleKey.R)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 80, 127));
                    //sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 80, 32));
                }

                else if(key.Key == ConsoleKey.Y)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.RainbowSpark, 0, 127, 0, 127, 16));
                    sender.Send(new OscMessage("/O", (int)Mode.RainbowSpark, 0, 127, 0, 127, 16));
                }

                else if(key.Key == ConsoleKey.D1)
                {
                    //                                  0                      1  2    3   4    5    6
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 20, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 254, 32));
                }
                else if(key.Key == ConsoleKey.D2)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 60, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 254, 32));
                }
                else if(key.Key == ConsoleKey.D3)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 254, 32));
                }
                else if(key.Key == ConsoleKey.D4)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 140, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 254, 32));
                }
                else if(key.Key == ConsoleKey.D5)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 180, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 254, 32));
                }
                else if(key.Key == ConsoleKey.D6)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 220, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 254, 32));
                }
                else if(key.Key == ConsoleKey.D7)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 10, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 254, 32));
                }
                else if(key.Key == ConsoleKey.D8)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 70, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 254, 32));
                }
                else if(key.Key == ConsoleKey.D9)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 140, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 254, 32));
                }
                else if(key.Key == ConsoleKey.D0)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 210, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 254, 32));
                }

                ///

                else if(key.Key == ConsoleKey.F1)
                {
                    //                                  0                      1  2    3   4    5    6
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                else if(key.Key == ConsoleKey.F2)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 60, 255, 50, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                else if(key.Key == ConsoleKey.F3)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 97, 255, 50, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                else if(key.Key == ConsoleKey.F4)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 140, 255, 50, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                else if(key.Key == ConsoleKey.F5)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 180, 255, 50, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                else if(key.Key == ConsoleKey.F6)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 220, 255, 50, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                else if(key.Key == ConsoleKey.F7)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 10, 255, 50, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                else if(key.Key == ConsoleKey.F8)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 70, 255, 50, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                else if(key.Key == ConsoleKey.F9)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 140, 255, 50, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }
                else if(key.Key == ConsoleKey.F10)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 210, 255, 50, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 20, 255, 50, 32));
                }

                ///

                else if(key.Key == ConsoleKey.G)
                {
                    //                                  0                      1  2    3  4  5    6
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 0, 0, 255, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 0, 0, 255, 127));
                }

                else if(key.Key == ConsoleKey.T)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, 0, 0, 0, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, 0, 0, 0, 127));
                }

                ///

                else if(key.Key == ConsoleKey.U)
                {
                    //                                  0                      1  2    3  4    5    6
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 0, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 0, 255, 254, 127));
                }
                else if(key.Key == ConsoleKey.I)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 64, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 64, 255, 254, 127));
                }
                else if(key.Key == ConsoleKey.O)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 128, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 128, 255, 254, 127));
                }
                else if(key.Key == ConsoleKey.P)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 192, 255, 254, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 192, 255, 254, 127));
                }

                else if(key.Key == ConsoleKey.H)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 20, 255, 254, 63));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 20, 255, 254, 63));
                }
                else if(key.Key == ConsoleKey.J)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 50, 255, 254, 63));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 50, 255, 254, 63));
                }
                else if(key.Key == ConsoleKey.K)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 80, 255, 254, 63));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 80, 255, 254, 63));
                }
                else if(key.Key == ConsoleKey.L)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 120, 255, 254, 63));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 120, 255, 254, 63));
                }

                else if(key.Key == ConsoleKey.C)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.DualSpark, 0, 127, 60, 200, 127, 16));
                    sender.Send(new OscMessage("/O", (int)Mode.DualSpark, 0, 127, 60, 200, 127, 16));
                }

                else if(key.Key == ConsoleKey.V)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SingleSpark, 0, 127, 100, 255, 254, 16));
                    sender.Send(new OscMessage("/O", (int)Mode.SingleSpark, 0, 127, 100, 255, 254, 16));
                }

                else if(key.Key == ConsoleKey.B)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 20, 255, 254, 1));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 20, 255, 254, 1));
                }
                else if(key.Key == ConsoleKey.N)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 50, 255, 254, 1));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 50, 255, 254, 1));
                }
                else if(key.Key == ConsoleKey.M)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 80, 255, 254, 1));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 80, 255, 254, 1));
                }
                else if(key.Key == ConsoleKey.OemComma)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.SinglePulse, 0, 127, 120, 255, 254, 1));
                    sender.Send(new OscMessage("/O", (int)Mode.SinglePulse, 0, 127, 120, 255, 254, 1));
                }

                else if(key.Key == ConsoleKey.A)
                {
                    int r = 0;

                    while (r++ < 1)
                    {
                        for (var i = 0.0; i < Math.PI; i += (Math.PI / 100))
                        {
                            //                                  0                  1  2    3   4  5    6
                            sender.Send(new OscMessage("/L", (int)Mode.VUMeter, 0, 127, 63, 0, 128, (int)(Math.Pow(Math.Sin(i), 18) * 255)));
                            sender.Send(new OscMessage("/O", (int)Mode.VUMeter, 0, 127, 63, 0, 128, (int)(Math.Pow(Math.Sin(i), 18) * 255)));

                            Thread.Sleep(5);
                        }
                    }
                }

                else if(key.Key == ConsoleKey.OemPeriod)
                {
                    int r = 0;

                    while (r++ < 1)
                    {
                        for (var i = 0; i <= 360; i++)
                        {
                            sender.Send(new OscMessage("/L", (int)Mode.Kitt, i > 180 ? 360 - i : i, 20, 98));
                            sender.Send(new OscMessage("/O", (int)Mode.Kitt, i > 180 ? 360 - i : i, 20, 98));

                            Thread.Sleep(10);
                        }
                    }
                }

                else if(key.Key == ConsoleKey.S)
                {

                    for (var i = 0.0; i < Math.PI; i += (Math.PI / 100))
                    {
                        int r = 0;

                        while (r++ < 5)
                        {
                            sender.Send(new OscMessage("/L", (int)Mode.Twinkle, 0, 127, 97, (int)(Math.Pow(Math.Sin(i), 1) * 180)));
                            sender.Send(new OscMessage("/O", (int)Mode.Twinkle, 0, 127, 97, (int)(Math.Pow(Math.Sin(i), 1) * 180)));

                            Thread.Sleep(20);
                        }
                    }
                }

                else if(key.Key == ConsoleKey.D)
                {
                    int r = 0;
                    while (r++ < 100)
                    {
                        //                                  0                  1  2    3                                         4
                        sender.Send(new OscMessage("/L", (int)Mode.Twinkle, 0, 127, (int)((new Random()).NextDouble() * 255), (int)(Math.Pow(Math.Sin(r), 1) * 120)));
                        sender.Send(new OscMessage("/O", (int)Mode.Twinkle, 0, 127, (int)((new Random()).NextDouble() * 255), (int)(Math.Pow(Math.Sin(r), 1) * 120)));

                        Thread.Sleep(5);
                    }
                }

                else if(key.Key == ConsoleKey.F)
                {
                    int r = 0;
                    while (r++ < 256)
                    {
                        sender.Send(new OscMessage("/L", (int)Mode.SingleSolid, 0, 127, r, 255, 254, 127));
                        sender.Send(new OscMessage("/O", (int)Mode.SingleSolid, 0, 127, r, 255, 254, 127));

                        Console.WriteLine(r);
                        Thread.Sleep(100);
                    }
                }
                else if(key.Key == ConsoleKey.Z)
                {
                    //                                  0                  1  2    3                                         4
                    sender.Send(new OscMessage("/L", (int)Mode.Twinkle, 0, 127, (int)((new Random()).NextDouble() * 255), 127));
                    sender.Send(new OscMessage("/O", (int)Mode.Twinkle, 0, 127, (int)((new Random()).NextDouble() * 255), 127));
                }

                else if(key.Key == ConsoleKey.X)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.RainbowSolid, 0, 127, 0, 127));
                    sender.Send(new OscMessage("/O", (int)Mode.RainbowSolid, 0, 127, 0, 127));
                }


                else if(key.Key == ConsoleKey.Spacebar)
                {
                    strobo = ((strobo + 31) % 95);
                    color = ((color + 15) % 255);

                    Console.WriteLine($"S {strobo} C {color}");

                    sender.Send(new OscMessage("/L", (int)Mode.Strobo, color, strobo));
                    sender.Send(new OscMessage("/O", (int)Mode.Strobo, color, strobo));
                }
                else if(key.Key == ConsoleKey.Escape)
                {
                    sender.Send(new OscMessage("/L", (int)Mode.Strobo, 0, 0));
                    sender.Send(new OscMessage("/O", (int)Mode.Strobo, 0, 0));
                }

                Console.WriteLine("ON");
            }

            while (true);
        }
    }
}
