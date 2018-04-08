using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Edt_Monitor.Models
{
	public class MessageRun
	{
		[Key]
		public long Id { get; set; }

		public DateTime Start { get; set; }
		public DateTime Stop { get; set; }

		public int MessageCount { get; set; } = 0;
		public double AverageMps { get { if (Stop != null && Start != null && MessageCount > 0) { return (Stop - Start).TotalSeconds / MessageCount; } else { return 0; } } }

		[JsonIgnore]
		public ICollection<OscMessage> Messages { get; set; }
	}
}
