using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Edt_Monitor
{
    public static class DateTimeExtensions
    {
		public static DateTime FromUnixEpoch(long millisecondsSinceEpoch)
		{
			return new DateTime(1970, 1, 1, 0, 0, 0).AddMilliseconds(millisecondsSinceEpoch);
		}
    }
}
