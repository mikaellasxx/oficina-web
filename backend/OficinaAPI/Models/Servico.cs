namespace OficinaAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("servicos")]
public class Servico
{
    [Key]
    public int Id { get; set; }

    public string Nome { get; set; } = "";

    public decimal Preco { get; set; }
}