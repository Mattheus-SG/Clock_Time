using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeClock.Data.Migrations
{
    public partial class One : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "CountryOut",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "LatitudeEntry",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "LatitudeOut",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "LongitudeEntry",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "LongitudeOut",
                table: "TimeRecords");

            migrationBuilder.RenameColumn(
                name: "StreetOut",
                table: "TimeRecords",
                newName: "StreetExitTime");

            migrationBuilder.RenameColumn(
                name: "StreetEntry",
                table: "TimeRecords",
                newName: "StreetEntryTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StreetExitTime",
                table: "TimeRecords",
                newName: "StreetOut");

            migrationBuilder.RenameColumn(
                name: "StreetEntryTime",
                table: "TimeRecords",
                newName: "StreetEntry");

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

            migrationBuilder.AddColumn<string>(
                name: "CountryOut",
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

            migrationBuilder.AddColumn<double>(
                name: "LongitudeEntry",
                table: "TimeRecords",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "LongitudeOut",
                table: "TimeRecords",
                type: "double",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
