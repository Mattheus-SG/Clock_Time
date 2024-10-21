using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using TimeClock.Core.Entities;
using TimeClock.Core.Interfaces;
using TimeCLock.API.Services;
using TimeCLock.API.ViewModels;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace TimeCLock.API.Controllers
{
    [Route("api/appointment")]
    [ApiController]
    public class TimeRecordController : ControllerBase
    {

        private readonly ITimeRecordRepository TimeRecordRepository;
        private readonly IUserRepository UserRepository;

        public TimeRecordController(ITimeRecordRepository timeRecordRepository, IUserRepository userRepository)
        {
            this.TimeRecordRepository = timeRecordRepository;
            this.UserRepository = userRepository;
        }

        [HttpGet("{id}")]
        public string Get(int id) 
        {
            return "value";
        }

        [HttpPost("setEntryTime")]
        public async Task<ActionResult<dynamic>> Create(EntryRequestModel request)
        {

            // TODO: Check UserId
            if(request.Id == 0)
                return BadRequest("Id não informado.");

            var trs = await this.TimeRecordRepository.GetByUserId(request.Id);
            var tr = trs.Where(tr => tr.Date == DateService.GetOnlyDate()).FirstOrDefault();

            double latitude = request.Latitude;
            double longitude = request.Longitude;

            string latitudeStr = latitude.ToString().Replace(",", ".");
            string longitudeStr = longitude.ToString().Replace(",", ".");

            if(tr == null)
            {

                var locations = await PositionStackService.GetAddressAsync(latitudeStr, longitudeStr);
                var address = locations.FirstOrDefault();

                tr = new TimeRecord
                {
                    EntryTime = DateService.GetOnlyTime(),
                    Date = DateService.GetOnlyDate(),
                    UserId = request.Id,
                    StreetEntryTime = address.Label,
                    User = await this.UserRepository.GetByIdAsync(request.Id)
                };

                await this.TimeRecordRepository.AddAsync(tr);
                var success = await this.TimeRecordRepository.SaveChangesAsync();
                
                // TODO: Implemetar GetByUserIdAndDate(userId, string Date);
                trs = await this.TimeRecordRepository.GetByUserId(request.Id);
                tr = trs.Where(tr => tr.UserId == request.Id).FirstOrDefault();

                return new { timeRecord = tr };
            }

            return BadRequest($"Ponto de Entrada para o dia { tr.Date } já resgistrado às { tr.EntryTime }" );

        }

        [HttpPost]
        [Route("setOutTime")]
        public async Task<ActionResult<dynamic>> Put(EntryRequestModel request) 
        {

            // TODO: Check UserId
            if (request.Id == 0)
                return BadRequest("Id não informado.");

            double latitude = request.Latitude;
            double longitude = request.Longitude;

            string latitudeStr = latitude.ToString().Replace(",", ".");
            string longitudeStr = longitude.ToString().Replace(",", ".");

            var trs = await this.TimeRecordRepository.GetByUserId(request.Id);
            var timeRecord = trs.Where(tr => tr.Date == DateService.GetOnlyDate()).FirstOrDefault();

            if (timeRecord == null)
                return new { error = "Ponto de Entrada não registrado." };

            if (String.IsNullOrEmpty(timeRecord.OutTime))
            {
                var locations = await PositionStackService.GetAddressAsync(latitudeStr, longitudeStr);
                var address = locations.FirstOrDefault();

                timeRecord.OutTime = DateService.GetOnlyTime();
                timeRecord.StreetExitTime = address.Label;
                await this.TimeRecordRepository.UpdateAsync(timeRecord, timeRecord.Id);
                var success = await this.TimeRecordRepository.SaveChangesAsync();

                var times = await this.TimeRecordRepository.GetByUserId(request.Id);
                var trUpdate = trs.Where(tr => tr.Date == DateService.GetOnlyDate()).FirstOrDefault();
                return new { timeRecord = trUpdate };
            }


            return new { error = $"Ponto de Saída já resgistrado para o dia { timeRecord.Date } às { timeRecord.OutTime }" };

        }

        [HttpGet("user_appointments/{id}")]
        public async Task<ActionResult<dynamic>> AppointmentsUser(int id)
        {

            var trs = await this.TimeRecordRepository.GetByUserId(id);

            return Ok(trs.ToArray());
        }


        [HttpGet("appointment_today/{id}")]
        public async Task<ActionResult<dynamic>> AppointmentToday(int id)
        {
            var trs = await this.TimeRecordRepository.GetByUserId(id);
            var today = DateTime.Now.Date;
            var trToday = trs.Select(tr =>
            {
                DateTime trDate;
                bool validDate = DateTime.TryParseExact(tr.Date, "dd/MM/yyyy",
                                                        CultureInfo.InvariantCulture,
                                                        DateTimeStyles.None, out trDate);
                return validDate && trDate.Date == today ? tr : null;
            }).FirstOrDefault(tr => tr != null);

            if (trToday == null)
            {
                return Ok(new TimeRecord());
            }

            return Ok(trToday);
        }

        [HttpPost]
        [Route("facedetect")]
        public async Task<IActionResult> FaceDetect(IFormFile file)
        {

            if (file == null || file.Length == 0)
                return BadRequest("File is required.");

            // Caminho específico onde a imagem será salva
            var uploadFolder = @"C:\Users\noteb\Downloads"; // Mude para o caminho desejado
            var filePath = Path.Combine(uploadFolder, file.FileName);

            // Crie o diretório se não existir
            Directory.CreateDirectory(uploadFolder);

            // Salve o arquivo
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { filePath });
        }



    }
}
 