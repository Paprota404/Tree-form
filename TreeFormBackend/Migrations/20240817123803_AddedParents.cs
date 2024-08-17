using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TreeFormBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddedParents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TreeNodes_TreeNodes_TreeNodeId",
                table: "TreeNodes");

            migrationBuilder.RenameColumn(
                name: "TreeNodeId",
                table: "TreeNodes",
                newName: "ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_TreeNodes_TreeNodeId",
                table: "TreeNodes",
                newName: "IX_TreeNodes_ParentId");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "TreeNodes",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "TreeNodes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "TreeNodes",
                columns: new[] { "Id", "Name", "Order", "ParentId" },
                values: new object[,]
                {
                    { 1, "Root", 0, null },
                    { 2, "Child 1", 0, 1 },
                    { 3, "Child 2", 1, 1 }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_TreeNodes_TreeNodes_ParentId",
                table: "TreeNodes",
                column: "ParentId",
                principalTable: "TreeNodes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TreeNodes_TreeNodes_ParentId",
                table: "TreeNodes");

            migrationBuilder.DeleteData(
                table: "TreeNodes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TreeNodes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "TreeNodes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "Order",
                table: "TreeNodes");

            migrationBuilder.RenameColumn(
                name: "ParentId",
                table: "TreeNodes",
                newName: "TreeNodeId");

            migrationBuilder.RenameIndex(
                name: "IX_TreeNodes_ParentId",
                table: "TreeNodes",
                newName: "IX_TreeNodes_TreeNodeId");

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
    }
}
