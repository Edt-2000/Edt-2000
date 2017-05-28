using SharpOSC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;

namespace Edt_Graphics
{
	/// <summary>
	/// Interaction logic for MainWindow.xaml
	/// </summary>
	public partial class MainWindow : Window
	{
		public int currentShape = 0;
		public int nrOfShapes = 500;

		List<Shape> shapes = new List<Shape>();
		List<SolidColorBrush> brushes = new List<SolidColorBrush>();
		Random random = new Random();

		ScaleTransform beatTransform = new ScaleTransform();
		public DoubleAnimation animationS { get; set; }

		UDPListener listener;

		double angle = 0;
		double color = 0;
		bool cButton = false;
		bool zButton = false;

		public MainWindow()
		{
			InitializeComponent();

			HandleOscPacket callback = delegate (OscPacket packet)
			{
				var message = (OscMessage)packet;

				angle = (double)(((int)message.Arguments[2] + 100.0) / 200.0) * 2 * Math.PI;
				//color = (int)(2 * Math.PI * ((int)message.Arguments[1] / 127));
				cButton = (int)message.Arguments[0] == 1;
				zButton = (int)message.Arguments[1] == 1;
			};

			listener = new UDPListener(12345, callback);

			animationS = new DoubleAnimation();
			animationS.From = 2.0;
			animationS.To = 1.0;
			animationS.EasingFunction = new ExponentialEase();
			animationS.Duration = TimeSpan.FromMilliseconds(200);

			for (int i = 0; i < nrOfShapes; i++)
			{
				var shape = new Shape(beatTransform);
				MainCanvas.Children.Add(shape.box);

				shapes.Add(shape);

				brushes.Add(new SolidColorBrush());

				var colorBudget = 1.0 + (random.NextDouble());
				var ic = new int[3] { 0, 1, 2 };
				var c = new float[3] { 0, 0, 0 };

				switch ((int)(random.NextDouble() * 2.99))
				{
					case 0:
						Array.Reverse(ic);
						break;
					case 1:
						ic[1] = 0;
						ic[2] = 2;
						ic[2] = 1;
						break;
					case 2:
						break;
				}

				foreach (var n in ic)
				{
					var color = (float)Math.Min(colorBudget, random.NextSqrtFloat());

					c[n] = color;

					colorBudget -= color;

					if (colorBudget < 0)
						colorBudget = 0;
				}

				brushes[i].Color = Color.FromScRgb(0.8f, c[0], c[1], c[2]);
			}

			for (int i = 0; i < nrOfShapes; i++)
			{
				shapes[i].Initialize(brushes[i], 2 + (i % 3), random.Next(0, i + 3), random.NextDouble(), random.NextDouble());
			}

			CompositionTarget.Rendering += CompositionTarget_Rendering;
		}

		private void CompositionTarget_Rendering(object sender, EventArgs e)
		{
			//var angle = (Mouse.GetPosition(MainCanvas).X / MainCanvas.ActualWidth) * 2 * Math.PI;
			//var leftClick = Mouse.LeftButton == MouseButtonState.Pressed;
			//var rightClick = Mouse.RightButton == MouseButtonState.Pressed;

			var i = 2;

			while (--i >= 0)
			{
				if (shapes[currentShape].done)
				{
					shapes[currentShape].ChangeDirection(MainCanvas.ActualWidth, MainCanvas.ActualHeight, angle);
					shapes[currentShape].Animate();

					currentShape = ++currentShape % nrOfShapes;
				}
			}

			if (cButton)
			{
				beatTransform.BeginAnimation(ScaleTransform.ScaleXProperty, animationS);
				beatTransform.BeginAnimation(ScaleTransform.ScaleYProperty, animationS);
			}
		}
	}

	public static class RandomExtension
	{
		public static float NextSqrtFloat(this Random random)
		{
			return (float)Math.Sqrt(random.NextDouble());
		}
	}
}
