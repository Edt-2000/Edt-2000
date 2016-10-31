using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

using Edt_Monitor.Models;

namespace Edt_Monitor.Services
{
	public class SimulatorService : ISimulatorService
	{
		private SharpOSC.UDPSender _sender = new SharpOSC.UDPSender(IPAddress.Parse("10.0.0.255"), 12345);

		private bool _isRunning = false;

		private List<OscMessage> _buffer;

		private Task _task;
		private int _progress;

		private CancellationTokenSource _source = new CancellationTokenSource();

		public bool IsRunning()
		{
			return _isRunning;
		}

		public void Prepare(IEnumerable<OscMessage> collection)
		{
			_buffer = new List<OscMessage>(collection);
		}

		public void Start()
		{
			if (_buffer.Count() > 0)
			{
				_isRunning = true;

				_task = Task.Run(SendMessage, _source.Token);
			}
		}

		private async Task SendMessage()
		{
			DateTime previousExecution = DateTime.Now;
			DateTime previousTime = _buffer.First().Time;
			int i = 0;
			_progress = 0;

			foreach (var message in _buffer)
			{
				previousExecution = DateTime.Now;

				TimeSpan delta = (message.Time - previousTime);

				if (delta.TotalMilliseconds > 0)
				{
					await Task.Delay(delta, _source.Token);
				}

				previousTime = message.Time;

				_sender.Send(message.ToOscMessage());

				_progress = ++i;
			}

			Stop();
		}

		public DateTime Progress()
		{
			return _buffer[_progress].Time;
		}

		public void Stop()
		{
			_source.Cancel();

			_isRunning = false;
		}
	}
}
