
using TimeClock.Core.Entities;

namespace TimeClock.Core.Interfaces
{
    public interface IUserRepository : IRepository<User> 
    {

        Task<bool> EmailExists(string email);
        Task<IEnumerable<User>> GetAllWithAppointments();
        Task<User> GetUserWithAppointments(int id);

    }
}
