using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Edt_Monitor.Services;
using Edt_Monitor.Repositories;

namespace Edt_Monitor.Controllers
{
	[Route("api/[controller]")]
	public class SimulatorController : Controller
	{
		private IMessageRepository _messages;
		private ISimulatorService _simulator;

		public SimulatorController(IMessageRepository messageRepository, ISimulatorService simulator)
		{
			_messages = messageRepository;
			_simulator = simulator;
		}

		[HttpPost("start/{id:long}")]
		public bool StartSimulation(long id)
		{
			try
			{
				if (!_simulator.IsRunning())
				{
					var messages = _messages.FindRunById(id);

					_simulator.Prepare(messages);
					_simulator.Start();

					return true;
				}
				else
				{
					return false;
				}
			}
			catch (Exception)
			{
				return false;
			}
		}

		[HttpGet("progress")]
		public DateTime GetProgress()
		{
			if(_simulator.IsRunning())
			{
				return _simulator.Progress();
			}

			return DateTime.MinValue;
		}

		[HttpPost("stop")]
		public bool StopSimulation()
		{
			try
			{
				if (_simulator.IsRunning())
				{
					_simulator.Stop();

					return true;
				} else
				{
					return false;
				}
			}
			catch (Exception)
			{
				return false;
			}
		}
	}
}
