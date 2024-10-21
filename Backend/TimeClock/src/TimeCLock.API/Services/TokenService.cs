using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

using Microsoft.IdentityModel.Tokens;

using TimeClock.Core.Entities;

namespace TimeCLock.API.Services
{
    public static class TokenService
    {

        public static string GenerateTokens(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Constants.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
