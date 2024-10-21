
namespace TimeClock.Core.Entities
{
    public class User
    {

        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public bool uploadedPhotos { get; set; } = false;

        public string Phone { get; set; }

        public string Occupation { get; set; }

        public ICollection<TimeRecord> TimeRecords { get; set; } // Relacionamento com TimeRecord

        public bool Admin { get { return Role == "admin"; } }


    }
}
