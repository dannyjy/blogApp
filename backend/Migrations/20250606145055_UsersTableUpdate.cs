using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UsersTableUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_UsersId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_UsersId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_UsersId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Comments_UsersId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "UsersId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "UsersId",
                table: "Comments");

            migrationBuilder.AddColumn<string>(
                name: "Comments",
                table: "Users",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Posts",
                table: "Users",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comments",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Posts",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "UsersId",
                table: "Posts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UsersId",
                table: "Comments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UsersId",
                table: "Posts",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UsersId",
                table: "Comments",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_UsersId",
                table: "Comments",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_UsersId",
                table: "Posts",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
