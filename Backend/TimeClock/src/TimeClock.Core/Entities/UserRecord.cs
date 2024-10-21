
namespace TimeClock.Core.Entities
{
    public class UserRecord
    {

        public int Id { get; set; }

        public DateTime OvertimeHours { get; set; }

        public int Absences { get; set; }

        public int Delays { get; set; }

        public int WorkingDays { get; set; }

        public int UserId { get; set; }

    }
}
