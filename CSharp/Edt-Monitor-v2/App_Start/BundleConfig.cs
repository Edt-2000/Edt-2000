using System.Web;
using System.Web.Optimization;

namespace Edt_Monitor_v2
{
	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
						"~/Scripts/jquery-{version}.js",
						"~/Scripts/jquery.signalR-{version}.js"));

			bundles.Add(new StyleBundle("~/Content/css").Include(
					  "~/Content/monitor.css"));
		}
	}
}
