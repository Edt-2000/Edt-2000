using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Edt_Monitor.Models;
using Edt_Monitor.Services;

namespace Edt_Monitor.Repositories
{
	public class OscMessageRepository : IMessageRepository
	{
		private Queue<OscMessage> _messageCache = new Queue<OscMessage>();

		private IMessageService _messageService;

		private Task _moveTask;
		private CancellationTokenSource _cancelTokenSource = new CancellationTokenSource();

		private OscMessageContext _db;

		public OscMessageRepository(IMessageService messageService)
		{
			_messageService = messageService;

			_db = new OscMessageContext();

			_messageService.Receive((object sender, OscMessage message) =>
			{
				Add(message);
			});

			_moveTask = PeriodicTask.Run(Move, TimeSpan.FromSeconds(1), _cancelTokenSource.Token);
		}
		~OscMessageRepository()
		{
			_cancelTokenSource.Cancel();
			_messageService.Dispose();
			_db.Dispose();
		}

		public void Add(OscMessage message)
		{
			_messageCache.Enqueue(message);
		}

		private void Move(DateTime previous)
		{
			if (_messageCache.Count == 0)
			{
				return;
			}

			var max = previous.AddSeconds(-10);

			OscMessage message;
			message = _messageCache.Peek();

			if (message.Time > max)
			{
				return;
			}

			var currentRun = (from run in _db.Runs orderby run.Stop descending select run).FirstOrDefault();
			var hasFirstTime = true;
			if (currentRun == null || currentRun.Stop.AddSeconds(10) <= message.Time)
			{
				currentRun = new MessageRun();
				_db.Runs.Add(currentRun);
				_db.SaveChanges();
				hasFirstTime = false;
			}

			do
			{
				message = _messageCache.Dequeue();

				if (!hasFirstTime)
				{
					hasFirstTime = true;
					currentRun.Start = message.Time;
				}

				currentRun.Stop = message.Time;
				currentRun.MessageCount++;

				message.Run = currentRun;

				_db.Messages.Add(message);
			}
			while (_messageCache.Count > 0 && message.Time < max);

			_db.SaveChanges();
		}

		public IEnumerable<OscMessage> FindFromCache(DateTime fromTime, DateTime toTime)
		{
			foreach (var row in _messageCache.ToArray())
			{
				if (row.Time >= fromTime && row.Time <= toTime)
				{
					yield return row;
				}
			}
		}

		public IEnumerable<OscMessage> FindRunById(long id)
		{
			return from message
				   in _db.Messages.Include(message => message.OscData)
				   where message.Run.Id == id
				   orderby message.Time ascending
				   select message;
		}

		public IEnumerable<OscMessage> FindRun(DateTime fromTime, DateTime toTime)
		{
			return from message
				   in _db.Messages.Include(message => message.OscData)
				   where message.Time >= fromTime && message.Time <= toTime
				   orderby message.Time ascending
				   select message;
		}

		public IEnumerable<OscMessage> FindRun(DateTime fromTime, DateTime toTime, string oscAddress)
		{
			return from message
				   in _db.Messages.Include(message => message.OscData)
				   where message.Time >= fromTime && message.Time <= toTime && message.Address.Contains(oscAddress)
				   orderby message.Time ascending
				   select message;
		}

		public IEnumerable<MessageRun> Summary()
		{
			return from run
				   in _db.Runs
				   orderby run.Start descending
				   select run;
		}
	}
}