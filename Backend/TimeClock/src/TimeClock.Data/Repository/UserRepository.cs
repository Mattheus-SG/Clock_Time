
using Microsoft.EntityFrameworkCore;
using TimeClock.Core.Entities;
using TimeClock.Core.Interfaces;
using TimeClock.Data.Context;

namespace TimeClock.Data.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(DataContext context) : base(context){ }

        public async Task<bool> EmailExists(string email)
        {
            var existEmail = this.DbSet.Any(e => e.Email == email);
            if (existEmail)
                return true;

            return false;
        }

        public async Task<IEnumerable<User>> GetAllWithAppointments()
        {
            var users = await base._context.Users.Include(u => u.TimeRecords).ToListAsync();
            return users;
        }

        public async Task<User> GetUserWithAppointments(int id)
        {
            var user = await base._context.Users.Where(u => u.Id == id).Include(u => u.TimeRecords).FirstOrDefaultAsync();
            return user;
        }
    }
}
