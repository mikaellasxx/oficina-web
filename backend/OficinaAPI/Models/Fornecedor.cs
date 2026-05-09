namespace OficinaAPI.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("fornecedores")]
public class Fornecedor
{
    [Key]
    public int Id { get; set; }

    public string Nome { get; set; } = "";

    public string Telefone { get; set; } = "";

    public string Documento { get; set; } = ""; // CPF ou CNPJ (pode usar um campo só)
   
    public string Email { get; set; } = "";

    public string Endereco { get; set; } = "";
}