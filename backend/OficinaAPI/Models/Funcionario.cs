namespace OficinaAPI.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("funcionarios")]
public class Funcionario
{
    [Key]
    public int Id { get; set; }

    public string Nome { get; set; } = "";

    public string Cargo { get; set; } = "";

    public string Telefone { get; set; } = "";

    public string Email { get; set; } = "";

    public string Endereco { get; set; } = "";
}