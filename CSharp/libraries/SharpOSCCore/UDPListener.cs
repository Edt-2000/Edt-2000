using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Sockets;
using System.Net;
using System.Threading.Tasks;

namespace SharpOSC
{
	public class UDPListener : IDisposable
	{
		public int Port { get; private set; }
		
		UdpClient receivingUdpClient;

		public UDPListener(int port)
		{
			Port = port;
		
			// try to open the port 10 times, else fail
			for (int i = 0; i < 10; i++)
			{
				try
				{
                    receivingUdpClient = new UdpClient(port);
                    break;
				}
				catch (Exception)
				{
					// Failed in ten tries, throw the exception and give up
					if (i >= 9)
						throw;

					// Thread.Sleep(5)
					Task.Delay(5).RunSynchronously();
				}
			}

			Task.Run(async () =>
			{
				await ReceiveAsync();
			});
		}
		~UDPListener()
		{
			Dispose();
		}

		public event EventHandler<OscMessage> OnReceiveMessage;
		public event EventHandler<OscBundle> OnReceiveBundle;
		
		private async Task ReceiveAsync()
		{
			do
			{
				var result = await receivingUdpClient.ReceiveAsync();

				ReceiveData(result);
			}
			while (true);
		}

        public UDPListener(int port, EventHandler<OscMessage> callback) : this(port)
		{
			OnReceiveMessage += callback;
		}

		public UDPListener(int port, EventHandler<OscBundle> callback) : this(port)
		{
			OnReceiveBundle += callback;
		}

		void ReceiveData(UdpReceiveResult result)
		{
			// Process bytes
			if (result.Buffer != null && result.Buffer.Length > 0)
			{
				OscPacket packet;
				try
				{
					packet = OscMessage.GetPacket(result.Buffer, result.RemoteEndPoint);

					if (packet.GetType() == typeof(OscMessage))
					{
						OnReceiveMessage(this, (OscMessage)packet);
					}
					else
					{
						OnReceiveBundle(this, (OscBundle)packet);
					}
				}
				catch (Exception)
				{
					
				}
			}
		}
		
		public void Dispose()
		{
			receivingUdpClient.Dispose();
		}
	}
}
