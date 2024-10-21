using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using TimeCLock.API.Services;
using TimeCLock.API.ViewModels;
using TimeClock.Core.Entities;
using TimeClock.Core.Interfaces;
using TimeClock.Data.Context;

namespace TimeCLock.API.Controllers
{
    [Route("/api/account")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserRepository UserRepository;
        private readonly EncryptService EncryptService;

        public UserController(DataContext context, IUserRepository userRepository, EncryptService encryptService)
        {
            this.UserRepository = userRepository;
            this.EncryptService = encryptService;
        }

        //[Authorize(Roles = "admin")]
        [HttpGet("change_password")]
        public async Task<IActionResult> ChangePassword()
        {
            try
            {
                var addresses = await PositionStackService.GetAddressAsync("-23.62427221", "-46.70136611");
                return Ok(addresses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro: {ex.Message}");
            }
        }

        //[Authorize(Roles = "admin")]
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await this.UserRepository.GetAllWithAppointments();
                return Ok(users.ToArray());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro: {ex.Message}");
            }
        }

        [HttpGet("userfull/{id:int}")]
        public async Task<IActionResult> GetUserComplet(int id)
        {
            try
            {
                var user = await this.UserRepository.GetUserWithAppointments(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro: {ex.Message}");
            }
        }

        [HttpPost("update-user/{id}")]
        public async Task<IActionResult> UpdateUser(User user, int id)
        {
            try
            {
                // Busca o usuário no banco de dados
                var userDB = await this.UserRepository.GetUserWithAppointments(id);

                if (userDB == null)
                    return BadRequest("Usuário não encontrado.");

                // Compara a senha criptografada fornecida com a senha do banco de dados
                if (!this.EncryptService.EncryptPassword(user.Password).Equals(userDB.Password))
                    return BadRequest("Senha incorreta.");

                // Atualiza os campos necessários
                userDB.UserName = user.UserName;
                userDB.Phone = user.Phone;
                userDB.Occupation = user.Occupation;
                userDB.Email = user.Email;

                // Atualiza o usuário no banco de dados
                await this.UserRepository.UpdateAsync(userDB, id);
                var success = await this.UserRepository.SaveChangesAsync();

                if (success)
                {
                    return Ok(userDB);  // Retorna o usuário atualizado
                }

                return StatusCode(500, "Erro ao atualizar o usuário.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro: {ex.Message}");
            }
        }


        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var user = await this.UserRepository.GetByIdAsync(id);
                user.UserName = user.UserName.ToUpper();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro: {ex.Message}");
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Create([FromServices] DataContext context, [FromBody] User model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                model.UserName = model.UserName.ToLower();
                model.Email = model.Email.ToLower();

                if(await this.UserRepository.EmailExists(model.Email))
                    return BadRequest(new { message = "E-mail já cadastrado." });

                model.Password = this.EncryptService.EncryptPassword(model.Password);
                model.Role = "standard";

                await this.UserRepository.AddAsync(model);
                await this.UserRepository.SaveChangesAsync();

                var user = await this.UserRepository.GetByIdAsync(model.Id);

                return Ok(new { user = user.UserName, email = user.Email, role = user.Role, admin = user.Admin });
            }
            catch (System.Exception)
            {
                return BadRequest(new { message = "Não foi possível criar usuário." });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] LoginViewModel model)
        {
            var users = await this.UserRepository.GetAll();
            model.Email = model.Email.ToLower();
            model.Password = EncryptService.EncryptPassword(model.Password);
            var user = users.Where(x => x.Email == model.Email && x.Password == model.Password).FirstOrDefault();
            if (user == null) 
                return NotFound(new { message = "Usuário ou senha inválidos" });

            var token = TokenService.GenerateTokens(user);

            return new { user = user.UserName, token = token };
        }

        [HttpPost]
        [Route("upload-photos/{id}")]
        public async Task<IActionResult> UploadPhotos(IFormFile[] files, int id)
        {

            if(id == 0)
                return BadRequest("Id é necessário.");

            if (files == null || files.Length == 0)
                return BadRequest("File is required.");

            // Define o caminho base para salvar as fotos
            var basePath = Path.Combine(@"\\192.168.100.184\fotos", "UploadedPhotos", id.ToString());

            // Cria o diretório se não existir
            if (!Directory.Exists(basePath))
            {
                Directory.CreateDirectory(basePath);
            }

            foreach (var file in files)
            {
                // Garante que o arquivo tenha um nome único
                var fileName = Path.GetFileName(file.FileName);
                var filePath = Path.Combine(basePath, fileName);

                // Salva o arquivo
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            var user = await this.UserRepository.GetByIdAsync(id);
            user.uploadedPhotos = true;

            await this.UserRepository.UpdateAsync(user, id);
            var success = await this.UserRepository.SaveChangesAsync();

            return Ok(new { message = "Files uploaded successfully!", fileCount = files.Length });
            //return Ok();
        }
    }
}
