
using Microsoft.EntityFrameworkCore;
using TimeClock.Core.Entities;
using TimeClock.Core.Interfaces;
using TimeClock.Data.Context;

namespace TimeClock.Data.Repository
{
    public class TimeRecordRepository : Repository<TimeRecord>, ITimeRecordRepository
    {
        public TimeRecordRepository(DataContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TimeRecord>> GetByUserId(int userId)
        {
            // Apenas filtrar no banco de dados e retornar os resultados
            return await base._context.TimeRecords
                                     .Where(u => u.UserId == userId)
                                     .ToListAsync();
        }

    }
}
