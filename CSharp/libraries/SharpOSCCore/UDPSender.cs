using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Sockets;
using System.Net;
using System.Threading;

namespace SharpOSC
{
	public class UDPSender
	{
		public int Port
		{
			get { return _port; }
		}
		int _port;

		public IPAddress Address
		{
			get { return _address; }
		}
		IPAddress _address;

		IPEndPoint RemoteIpEndPoint;
		Socket socket;

		public UDPSender(IPAddress address, int port)
		{
			_port = port;
			_address = address;

			socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
			
			RemoteIpEndPoint = new IPEndPoint(address, port);
		}

		public void Send(byte[] message)
		{
			socket.SendTo(message, RemoteIpEndPoint);
		}

		public void Send(OscPacket packet)
		{
			byte[] data = packet.GetBytes();
			Send(data);
		}

		public void Close()
		{
			socket.Shutdown(SocketShutdown.Both);
		}
	}
}
