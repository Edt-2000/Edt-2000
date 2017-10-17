using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

using SharpOSC;

namespace Edt_Monitor_v2.MessageHandlers
{
	public class MessageHandler
	{
		private static Lazy<MessageHandler> _instance = new Lazy<MessageHandler>(() => new MessageHandler());

		public static MessageHandler Instance
		{
			get
			{
				return _instance.Value;
			}
		}

		private UDPListener listener;

		public MessageHandler()
		{
			HandleOscPacket callback = delegate (OscPacket packet)
			{
				var message = (OscMessage)packet;
				int i = 0;

				if (OnMessageReceived != null)
				{
					foreach (var argument in message.Arguments)
					{
						OnMessageReceived(this, new KeyValuePair<string, float>($"param-{++i}", float.Parse(argument.ToString())));
					}
				}
			};

			listener = new UDPListener(12345, callback);
		}

		public event EventHandler<KeyValuePair<string, float>> OnMessageReceived;
	}
}