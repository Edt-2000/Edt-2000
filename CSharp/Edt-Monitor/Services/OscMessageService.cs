using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;

using Edt_Monitor.Models;
using Edt_Monitor.Repositories;

namespace Edt_Monitor.Services
{
	public class OscMessageService : IMessageService
	{
		private static SharpOSC.UDPListener _listener;
		private event EventHandler<OscMessage> _messageHandlers;

		public OscMessageService()
		{
			_listener = new SharpOSC.UDPListener(12345, (object sender, SharpOSC.OscMessage message) =>
			{
				_messageHandlers(this, message.ToOscMessage());
			});
		}

		public void Receive(EventHandler<OscMessage> callback)
		{
			_messageHandlers += callback;
		}

		public void Dispose()
		{
			_listener.Dispose();
		}
	}
}
