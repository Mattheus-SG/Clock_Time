using Newtonsoft.Json;
using System.Globalization;
using System.Net;
using System.Text.Json;

namespace TimeCLock.API.Services
{
    public class PositionStackService
    {

        public PositionStackService()
        {
        }

        public static async Task<List<Address>> GetAddressAsync(string latitude, string longitude)
        {

            var apiKey = Constants.KeyPositionStack;
            var httpClient = new HttpClient();

            string apiUrl = $"http://api.positionstack.com/v1/reverse?access_key={apiKey}&query={latitude},{longitude}";

            try
            {
                HttpResponseMessage response = await httpClient.GetAsync(apiUrl);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                
                var jsonDocument = JsonDocument.Parse(responseBody);
                var addressArray = jsonDocument.RootElement.GetProperty("data").GetRawText();
                var addresses = JsonConvert.DeserializeObject<List<Address>>(addressArray);

                return addresses;
            }
            catch (HttpRequestException e)
            {
                throw new Exception($"Erro na requisição: {e.Message}");
            }
        }
    }

    public class Address
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Type { get; set; }
        public double Distance { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Postal_code { get; set; } // Altere para Postal_code
        public string Street { get; set; }
        public double Confidence { get; set; }
        public string Region { get; set; }
        public string Region_code { get; set; } // Altere para Region_code
        public string County { get; set; }
        public string City { get; set; } // ADD
        public string Locality { get; set; }
        public string Administrative_area { get; set; } // Altere para Administrative_area
        public string Neighbourhood { get; set; }
        public string Country { get; set; }
        public string Country_code { get; set; } // Altere para Country_code
        public string Continent { get; set; }
        public string Label { get; set; }
    }

}



