using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Text;

namespace SharpOSC
{
    public class USBSender
    {
        private SerialPort serialPort;

        public USBSender(string portName, int baudRate)
        {
            serialPort = new SerialPort(portName, baudRate);

            serialPort.Open();
        }

        public void Send(byte[] message)
        {
            serialPort.Write(message, 0, message.Length);
        }

        public void Send(OscPacket packet)
        {
            byte[] data = packet.GetBytes();
            Send(data);
        }
    }
}