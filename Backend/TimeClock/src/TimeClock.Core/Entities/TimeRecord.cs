namespace TimeClock.Core.Entities
{
    public class TimeRecord
    {

        public int Id { get; set; }

        public string EntryTime { get; set; }

        public string OutTime { get; set; }

        public string Date { get; set; }


        // Entry Time

        public string StreetEntryTime { get; set; }

        // Out Time
        public string StreetExitTime { get; set; }


        public int UserId { get; set; }

        public User User { get; set; }

    }
}
