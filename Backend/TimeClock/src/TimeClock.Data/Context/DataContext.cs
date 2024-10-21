using Microsoft.EntityFrameworkCore;
using TimeClock.Core.Entities;

namespace TimeClock.Data.Context
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<TimeRecord> TimeRecords { get; set; }

    }
}
