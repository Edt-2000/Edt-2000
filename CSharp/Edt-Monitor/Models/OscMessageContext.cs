using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Edt_Monitor.Models
{
	public class OscMessageContext : DbContext
	{
		public DbSet<OscMessage> Messages { get; set; }
		public DbSet<MessageRun> Runs { get; set; }

		public OscMessageContext(DbContextOptions<OscMessageContext> options) : base(options)
		{
			Database.EnsureCreated();
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlite("Filename=/Edt-2000/CSharp/Edt-Monitor/Database/messages.db");
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<MessageRun>().HasMany(entity => entity.Messages);
			modelBuilder.Entity<OscMessage>().HasOne(entity => entity.Run);
		}
	}
}
