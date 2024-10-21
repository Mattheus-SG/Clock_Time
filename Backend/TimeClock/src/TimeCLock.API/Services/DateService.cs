namespace TimeCLock.API.Services
{
    public class DateService
    {

        public static string GetOnlyDate()
        {
            TimeZoneInfo tzBrasilia = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
            DateTime DateAndHour = TimeZoneInfo.ConvertTime(DateTime.Now, tzBrasilia);
            DateTime currentDateBrasilia = DateAndHour.Date;
            return currentDateBrasilia.ToString("dd/MM/yyyy");
        }


        public static string GetOnlyTime()
        {
            TimeZoneInfo tzBrasilia = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
            DateTime DateAndHour = TimeZoneInfo.ConvertTime(DateTime.Now, tzBrasilia);
            TimeSpan currentTime = DateAndHour.TimeOfDay;

            return currentTime.ToString("hh':'mm");
        }


    }
}
