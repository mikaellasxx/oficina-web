using Microsoft.AspNetCore.Mvc;
using OficinaAPI.Data;
using OficinaAPI.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class OrdensServicoController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdensServicoController(AppDbContext context)
    {
        _context = context;
    }

// GET - listar todos
    [HttpGet]
public IActionResult Get()
{
    var ordens = _context.OrdensServico
        .Include(os => os.Cliente)
        .Include(os => os.Veiculo)
        .Include(os => os.Funcionario)
        .Include(os => os.Itens)
        .ToList();

    return Ok(ordens);
}

// GET por ID
[HttpGet("{id}")]
public IActionResult GetById(int id)

{
    var os = _context.OrdensServico
        .Include(o => o.Cliente)
        .Include(o => o.Veiculo)
        .Include(o => o.Funcionario)
        .Include(o => o.Itens)
        .FirstOrDefault(o => o.Id == id);

    if (os == null)
        return NotFound();

    return Ok(os);
}


// POST - criar ordem de serviço
 [HttpPost]
public IActionResult Post([FromBody] OrdemServico os)
{
    foreach (var item in os.Itens)
    {
        item.OrdemServico = os;

        if (item.Tipo == "Peca")
        {
            var peca = _context.Pecas.Find(item.ItemId);
            if (peca == null) return BadRequest("Peça não encontrada");

            item.Valor = peca.Preco;
            item.Descricao = peca.Nome;
        }
        else if (item.Tipo == "Servico")
        {
            var servico = _context.Servicos.Find(item.ItemId);
            if (servico == null) return BadRequest("Serviço não encontrado");

            item.Valor = servico.Preco;
            item.Descricao = servico.Nome;
        }
    }

    os.ValorTotal = os.Itens.Sum(i => i.Valor * i.Quantidade);

    _context.OrdensServico.Add(os);
    _context.SaveChanges();

    return Ok(os);
}

// PUT - atualizar ordem de serviço
[HttpPut("{id}")]
public IActionResult Put(int id, [FromBody] OrdemServico os)
{
    var ordemExistente = _context.OrdensServico.Find(id);
    if (ordemExistente == null)
        return NotFound();

    // Atualiza as propriedades da ordem de serviço
    ordemExistente.DataInicio = os.DataInicio;
    ordemExistente.DataPrevisao = os.DataPrevisao;
    ordemExistente.DataFinalizacao = os.DataFinalizacao;
    ordemExistente.Status = os.Status;
    ordemExistente.Descricao = os.Descricao;
    ordemExistente.Observacoes = os.Observacoes;
    ordemExistente.ClienteId = os.ClienteId;
    ordemExistente.VeiculoId = os.VeiculoId;
    ordemExistente.FuncionarioId = os.FuncionarioId;

    // Atualiza os itens da ordem de serviço
    _context.OrdensServicoItens.RemoveRange(ordemExistente.Itens);
    foreach (var item in os.Itens)
    {
        item.OrdemServico = ordemExistente;

        if (item.Tipo == "Peca")
        {
            var peca = _context.Pecas.Find(item.ItemId);
            if (peca == null) return BadRequest("Peça não encontrada");

            item.Valor = peca.Preco;
            item.Descricao = peca.Nome;
        }
        else if (item.Tipo == "Servico")
        {
            var servico = _context.Servicos.Find(item.ItemId);
            if (servico == null) return BadRequest("Serviço não encontrado");

            item.Valor = servico.Preco;
            item.Descricao = servico.Nome;
        }
        ordemExistente.Itens.Add(item);
    }

    ordemExistente.ValorTotal = ordemExistente.Itens.Sum(i => i.Valor * i.Quantidade);

    _context.SaveChanges();

    return Ok(ordemExistente);
} 

// DELETE - remover ordem de serviço
[HttpDelete("{id}")]
public IActionResult Delete(int id)
{
    var ordem = _context.OrdensServico.Find(id);
    if (ordem == null)
        return NotFound();

    _context.OrdensServico.Remove(ordem);
    _context.SaveChanges();

    return Ok();
}   

}
