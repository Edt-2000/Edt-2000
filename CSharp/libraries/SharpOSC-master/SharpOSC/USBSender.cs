﻿using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Text;

namespace SharpOSC
{
    public class USB
    {
        private SerialPort serialPort;

        public USB(string portName, int baudRate)
        {
            serialPort = new SerialPort(portName, baudRate);

            serialPort.WriteTimeout = 1;

            //serialPort.DataReceived += SerialPort_DataReceived;

            serialPort.Open();
        }

        private void SerialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            if(e.EventType == SerialData.Chars)
            {
                Console.WriteLine(serialPort.ReadExisting());
            }
        }

        public void Send(byte[] message)
        {
            try
            {
                serialPort.Write(message, 0, message.Length);
            }
            catch(Exception)
            {
                serialPort.Close();
                serialPort.Open();
            }
        }

        public void Send(OscPacket packet)
        {
            byte[] data = packet.GetBytes();
            Send(data);
        }
    }
}