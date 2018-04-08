using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace Edt_Graphics
{
	public class Shape
	{
		public Viewbox box { get; set; }
		public Polygon polygon { get; set; }
		public DoubleAnimation animationA { get; set; }
		public DoubleAnimation animationX { get; set; }
		public DoubleAnimation animationY { get; set; }
		public RotateTransform rotate { get; set; }
		public TranslateTransform translate { get; set; }

		public double divergence { get; set; }
		public bool done { get; set; }

		public Shape(ScaleTransform scale)
		{
			done = true;

			box = new Viewbox();
			box.Width = 25;
			box.Height = 25;
			box.Visibility = Visibility.Hidden;

			polygon = new Polygon();

			box.Child = polygon;

			animationA = new DoubleAnimation();
			animationA.From = 0.0;
			animationA.Duration = TimeSpan.FromSeconds(1);
			animationA.Completed += Animation_Completed;

			animationX = new DoubleAnimation();
			animationX.Duration = TimeSpan.FromSeconds(1);

			animationY = new DoubleAnimation();
			animationY.Duration = TimeSpan.FromSeconds(1);

			var transforms = new TransformGroup();

			rotate = new RotateTransform();
			translate = new TranslateTransform();

			transforms.Children.Add(rotate);
			transforms.Children.Add(translate);

			polygon.RenderTransform = scale;

			box.RenderTransform = transforms;
		}

		public void Initialize(Brush brush, int points, double rotation, double divergence, double speed)
		{
			var pl = new List<Point>();

			var anglePerPoint = (2 * Math.PI) / points;
			var angleRotation = anglePerPoint * rotation / points;

			for (int i = 0; i < points; i++)
			{
				pl.Add(new Point((Math.Sin((anglePerPoint * i) + angleRotation) * 100.0), (Math.Cos((anglePerPoint * i) + angleRotation) * 100.0)));
			}

			this.divergence = divergence;

			animationA.To = 980 * speed;

			polygon.Points = new PointCollection(pl);
			polygon.Fill = brush;
		}

		public void ChangeDirection(double width, double height, double direction)
		{
			var halfWidth = width / 2;
			var halfHeight = height / 2;

			var angle = (direction + divergence / 2);

			if (double.IsNaN(angle))
				angle = 0;

			animationX.To = halfWidth + (halfWidth * Math.Sin(angle));
			animationY.To = halfHeight + (halfHeight * Math.Cos(angle));

			animationX.From = halfWidth - (halfWidth * Math.Sin(angle));
			animationY.From = halfHeight - (halfHeight * Math.Cos(angle));
		}

		public void Animate()
		{
			done = false;
			box.Visibility = Visibility.Visible;

			translate.BeginAnimation(TranslateTransform.XProperty, animationX);
			translate.BeginAnimation(TranslateTransform.YProperty, animationY);
			rotate.BeginAnimation(RotateTransform.AngleProperty, animationA);	
		}

		private void Animation_Completed(object sender, EventArgs e)
		{
			box.Visibility = Visibility.Hidden;
			done = true;
		}
	}
}
