namespace OficinaAPI.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("clientes")]
public class Cliente
{
    [Key]
    public int Id { get; set; }

    public string Nome { get; set; } = "";

    public string Telefone { get; set; } = "";

    // CPF ou CNPJ (pode usar um campo só)
    public string Documento { get; set; } = "";

    public string Email { get; set; } = "";

    public string Endereco { get; set; } = "";

    public List<Veiculo> Veiculos { get; set; } = new();
}