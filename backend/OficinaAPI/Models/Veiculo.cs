
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OficinaAPI.Models;
[Table("veiculos")]
public class Veiculo
{
    [Key]
    public int Id { get; set; }

    public string Placa { get; set; } = "";

    public string Marca { get; set; } = "";

    public string Modelo { get; set; } = "";

    public int AnoFabricacao { get; set; }

    public string Cor { get; set; } = "";

    // Pode ser string (flexível) ou enum (mais avançado)
    public string Combustivel { get; set; } = "";

    public int Quilometragem { get; set; }

    public string Observacoes { get; set; } = "";

    // 🔗 RELACIONAMENTO COM CLIENTE
    public int ClienteId { get; set; }

    [ForeignKey("ClienteId")]
    [JsonIgnore]
    public Cliente? Cliente { get; set; }
}