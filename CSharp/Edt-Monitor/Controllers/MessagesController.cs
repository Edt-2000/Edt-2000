using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Edt_Monitor.Models;
using Edt_Monitor.Repositories;

namespace Edt_Monitor.Controllers
{
	[Route("api/[controller]")]
	public class MessagesController : Controller
	{
		private IMessageRepository _messages;

		public MessagesController(IMessageRepository messageRepository)
		{
			_messages = messageRepository;
		}

		// Cache methods

		[HttpGet("cache")]
		public IEnumerable<OscMessage> Get()
		{
			return Get(0, 10);
		}

		[HttpGet("cache/{minutes:int}/{seconds:int}")]
		public IEnumerable<OscMessage> Get(int minutes, int seconds)
		{
			return _messages.FindFromCache(DateTime.Now.Subtract(new TimeSpan(0, minutes, seconds)), DateTime.Now);
		}

		// Database methods

		[HttpGet("summary")]
		public IEnumerable<MessageRun> GetRuns()
		{
			return _messages.Summary();
		}

		[HttpGet("{id:long}")]
		public IEnumerable<OscMessage> GetRunMessages(long id)
		{
			return _messages.FindRunById(id);
		}

		[HttpGet("{fromTime:long}/{toTime:long}")]
		public IEnumerable<OscMessage> Get(long fromTime, long toTime)
		{
			return _messages.FindRun(DateTimeExtensions.FromUnixEpoch(fromTime), DateTimeExtensions.FromUnixEpoch(toTime));
		}

		[HttpGet("{fromTime:long}/{toTime:long}/{oscAddress}")]
		public IEnumerable<OscMessage> Get(long fromTime, long toTime, string oscAddress)
		{
			return _messages.FindRun(DateTimeExtensions.FromUnixEpoch(fromTime), DateTimeExtensions.FromUnixEpoch(toTime), oscAddress);
		}


	}
}
