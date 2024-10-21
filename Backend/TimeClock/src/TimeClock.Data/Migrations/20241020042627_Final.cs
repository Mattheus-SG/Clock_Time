using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeClock.Data.Migrations
{
    public partial class Final : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Street",
                table: "TimeRecords",
                newName: "StreetOut");

            migrationBuilder.RenameColumn(
                name: "Longitude",
                table: "TimeRecords",
                newName: "LongitudeOut");

            migrationBuilder.RenameColumn(
                name: "Latitude",
                table: "TimeRecords",
                newName: "LongitudeEntry");

            migrationBuilder.RenameColumn(
                name: "Country",
                table: "TimeRecords",
                newName: "StreetEntry");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "TimeRecords",
                newName: "CountryOut");

            migrationBuilder.AddColumn<string>(
                name: "CityEntry",
                table: "TimeRecords",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "CityOut",
                table: "TimeRecords",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "CountryEntry",
                table: "TimeRecords",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<double>(
                name: "LatitudeEntry",
                table: "TimeRecords",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "LatitudeOut",
                table: "TimeRecords",
                type: "double",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CityEntry",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "CityOut",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "CountryEntry",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "LatitudeEntry",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "LatitudeOut",
                table: "TimeRecords");

            migrationBuilder.RenameColumn(
                name: "StreetOut",
                table: "TimeRecords",
                newName: "Street");

            migrationBuilder.RenameColumn(
                name: "StreetEntry",
                table: "TimeRecords",
                newName: "Country");

            migrationBuilder.RenameColumn(
                name: "LongitudeOut",
                table: "TimeRecords",
                newName: "Longitude");

            migrationBuilder.RenameColumn(
                name: "LongitudeEntry",
                table: "TimeRecords",
                newName: "Latitude");

            migrationBuilder.RenameColumn(
                name: "CountryOut",
                table: "TimeRecords",
                newName: "City");
        }
    }
}
