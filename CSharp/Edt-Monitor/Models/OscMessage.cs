using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Edt_Monitor.Models
{
	public class OscMessage
	{
		[Key]
		[JsonIgnore]
		public long Id { get; set; }
		
		public DateTime Time { get; set; } = DateTime.Now;
		public string Address { get; set; }
		public string OriginIP { get; set; }
		public int OriginPort { get; set; }

		[JsonIgnore]
		public ICollection<OscData> OscData { get; set; }

		public List<object> Arguments
		{
			get
			{
				var result = new List<object>();

				if (OscData != null)
				{
					foreach (var data in OscData)
					{
						result.Add(data.GetObject());
					}
				}

				return result;
			}
		}

		[JsonIgnore]
		public MessageRun Run { get; set; }
	}

	public static class OscMessageConversion
	{
		public static OscMessage ToOscMessage(this SharpOSC.OscMessage message)
		{
			var newMessage = new OscMessage
			{
				Address = message.Address,
				OscData = message.Arguments.ToOscData(),
				OriginIP = message.OriginEP.Address.ToString(),
				OriginPort = message.OriginEP.Port
			};
			return newMessage;
		}

		public static List<OscData> ToOscData(this List<object> list)
		{
			var result = new List<OscData>();

			foreach (var argument in list)
			{
				switch (argument.GetType().ToString())
				{
					case "System.Int32":
						result.Add(new OscData { Int = (int)argument, Type = "i" });
						break;
					case "System.Single":
						result.Add(new OscData { Float = (float)argument, Type = "f" });
						break;
				}
			}

			return result;
		}

		public static SharpOSC.OscMessage ToOscMessage(this OscMessage message)
		{
			var newMessage = new SharpOSC.OscMessage(
				message.Address,
				new IPEndPoint(IPAddress.Parse(message.OriginIP), message.OriginPort));
			
			newMessage.Arguments = message.Arguments;
			
			return newMessage;
		}
	}
}