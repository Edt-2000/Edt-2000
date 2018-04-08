using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

using Edt_Monitor_v2.MessageHandlers;

namespace Edt_Monitor_v2.Hubs
{
	[HubName("messageHub")]
	public class MessageHub : Hub
	{
		private readonly MessageHandler _messageHandler;

		public MessageHub() : this(MessageHandler.Instance) { }

		public MessageHub(MessageHandler messageHandler)
		{
			_messageHandler = messageHandler;
			_messageHandler.OnMessageReceived += (object sender, KeyValuePair<string, float> value) => { Clients.All.Message(value.Key, value.Value); };
		}
	}
}