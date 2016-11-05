using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Edt_Monitor.Models
{
	public class OscData
	{
		[Key]
		public long Id { get; set; }

		public int Int { get; set; }
		public float Float { get; set; }

		public string Type { get; set; }

		public object GetObject()
		{
			if (Type == "i")
			{
				return Int;
			}
			else if (Type == "f")
			{
				return Float;
			}

			return null;
		}
	}
}
