namespace OficinaAPI.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Collections.Generic;

[Table("ordens_servico")]
public class OrdemServico
{
    public int Id { get; set; }

    public DateTime DataInicio { get; set; } = DateTime.Now;

    public DateTime? DataPrevisao { get; set; }

    public DateTime? DataFinalizacao { get; set; }

    public string Status { get; set; } = "Aberta";

    public string Descricao { get; set; } = "";

    public string Observacoes { get; set; } = "";

    public decimal ValorTotal { get; set; }

    // CLIENTE

    public int ClienteId { get; set; }

    [ForeignKey("ClienteId")]
    public Cliente? Cliente { get; set; }

    // VEÍCULO
    public int VeiculoId { get; set; }
    public Veiculo? Veiculo { get; set; }

    // FUNCIONÁRIO (responsável)
    public int FuncionarioId { get; set; }
    public Funcionario? Funcionario { get; set; }

    // Itens da ordem de serviço (serviços e peças)

    public List<OrdemServicoItem> Itens { get; set; } = new();

}