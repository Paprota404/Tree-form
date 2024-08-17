using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TreeFormBackend.Migrations
{
    /// <inheritdoc />
    public partial class CascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TreeNodes_TreeNodes_TreeNodeId",
                table: "TreeNodes");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "TreeNodes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_TreeNodes_TreeNodes_TreeNodeId",
                table: "TreeNodes",
                column: "TreeNodeId",
                principalTable: "TreeNodes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TreeNodes_TreeNodes_TreeNodeId",
                table: "TreeNodes");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "TreeNodes",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TreeNodes_TreeNodes_TreeNodeId",
                table: "TreeNodes",
                column: "TreeNodeId",
                principalTable: "TreeNodes",
                principalColumn: "Id");
        }
    }
}
