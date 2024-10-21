using System.Security.Cryptography;
using System.Text;

namespace TimeCLock.API.Services
{
    public class EncryptService
    {

        private readonly string AdditionalKey;

        public EncryptService(string additionalKey)
        {
            this.AdditionalKey = additionalKey;
        }

        public string EncryptPassword(string password)
        {
            var passwordWithKey = $"{password}{this.AdditionalKey}";

            var bytes = Encoding.UTF8.GetBytes(passwordWithKey);
            var sha512 = SHA512.Create();
            byte[] hashBytes = sha512.ComputeHash(bytes);
            return StringBytes(hashBytes);
        }

        private static string StringBytes(byte[] bytes)
        {
            var sb = new StringBuilder();
            foreach (byte b in bytes)
            {
                var hex = b.ToString("x2");
                sb.Append(hex);
            }
            return sb.ToString();
        }

    }
}
