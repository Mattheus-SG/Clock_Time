using TimeClock.Core.Entities;

namespace TimeClock.Core.Interfaces
{
    public interface ITimeRecordRepository : IRepository<TimeRecord>
    {

        // TODO: Implemetar GetByUser(int id)
        Task<IEnumerable<TimeRecord>> GetByUserId(int userId);

    }
}
