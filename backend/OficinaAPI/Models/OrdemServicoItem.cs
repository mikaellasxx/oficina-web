using OficinaAPI.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

[Table("ordens_servico_itens")]
public class OrdemServicoItem
{
    [Key]
    public int Id { get; set; }

    public int OrdemServicoId { get; set; }
  [JsonIgnore]
public OrdemServico? OrdemServico { get; set; }

    public string Tipo { get; set; } = ""; // "Servico" ou "Peca"

    public int ItemId { get; set; } // id do serviço ou peça

    public string Descricao { get; set; } = "";

    public decimal Valor { get; set; }

    public int Quantidade { get; set; }
}