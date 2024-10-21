using System.Text;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using TimeCLock.API.Services;
using TimeClock.Core.Interfaces;
using TimeClock.Data.Context;
using TimeClock.Data.Repository;



var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve);


#region ### AUTENTICAÇÃO JWT


var key = Encoding.ASCII.GetBytes(Constants.SecretKey);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});


#endregion


#region  ### DEPENDENCY INJECTION


//builder.Services.AddDbContext<DataContext>(opt => opt.UseInMemoryDatabase("DefaultDatabase"));
builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultDatabase"),
    MySqlServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultDatabase"))));
builder.Services.AddScoped<DataContext, DataContext>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITimeRecordRepository, TimeRecordRepository>();
builder.Services.AddScoped(option => new EncryptService(builder.Configuration.GetRequiredSection("Configurations:Password:AdditionalKey").Value));

#endregion


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
