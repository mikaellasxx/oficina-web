namespace OficinaAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("pecas")]
public class Peca
{
    [Key]
    public int Id { get; set; }

    public string Nome { get; set; } = "";

    public decimal Preco { get; set; }

    public int Quantidade { get; set; }

    public int? FornecedorId { get; set; }
    public Fornecedor? Fornecedor { get; set; }
}