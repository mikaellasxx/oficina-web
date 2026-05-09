using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OficinaAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddFornecedorIdNaPeca : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FornecedorId",
                table: "pecas",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_pecas_FornecedorId",
                table: "pecas",
                column: "FornecedorId");

            migrationBuilder.AddForeignKey(
                name: "FK_pecas_fornecedores_FornecedorId",
                table: "pecas",
                column: "FornecedorId",
                principalTable: "fornecedores",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_pecas_fornecedores_FornecedorId",
                table: "pecas");

            migrationBuilder.DropIndex(
                name: "IX_pecas_FornecedorId",
                table: "pecas");

            migrationBuilder.DropColumn(
                name: "FornecedorId",
                table: "pecas");
        }
    }
}
