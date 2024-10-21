using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeClock.Data.Migrations
{
    public partial class Real : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "TimeRecords",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "TimeRecords",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "TimeRecords",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "TimeRecords",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "TimeRecords",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "Street",
                table: "TimeRecords");
        }
    }
}
