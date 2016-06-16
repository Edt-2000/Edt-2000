using System;
using System.Threading;

using SharpOSC;

namespace Edt_2000_OCS_Mirror
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                var sender = new UDPSender("192.168.0.102", 8000);
                
                // The cabllback function
                HandleOscPacket callback = delegate (OscPacket packet)
                {
                    var messageReceived = (OscMessage)packet;
                    sender.Send(messageReceived);
                };

                var listener = new UDPListener(9000, callback);

                Console.WriteLine("Press enter to stop");
                Console.ReadLine();
                listener.Close();
            }
        }
    }
}
