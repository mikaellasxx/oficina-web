using Microsoft.AspNetCore.Mvc;
using OficinaAPI.Data;
using OficinaAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class VeiculosController : ControllerBase
{

   private readonly AppDbContext _context;   

    public VeiculosController(AppDbContext context)
    {
        _context = context;
    }

// GET - listar todos    
[HttpGet]
public IActionResult Get()
{
    var veiculos = _context.Veiculos.ToList();

    return Ok(veiculos);
}

// GET por ID
[HttpGet("{id}")]
public IActionResult GetById(int id)
{
    var veiculo = _context.Veiculos.Find(id);

    if (veiculo == null)
        return NotFound();

    return Ok(veiculo);
}

// POST - criar veiculo
[HttpPost]
public IActionResult Post([FromBody] Veiculo veiculo)
{
    _context.Veiculos.Add(veiculo);
    _context.SaveChanges();

    return Ok(veiculo);
}

// PUT - atualizar veiculo
[HttpPut("{id}")]
public IActionResult Put(int id, [FromBody] Veiculo veiculoAtualizado)
{
    var veiculo = _context.Veiculos.Find(id);

    if (veiculo == null)
        return NotFound();

    veiculo.Placa = veiculoAtualizado.Placa;
    veiculo.Marca = veiculoAtualizado.Marca;
    veiculo.Modelo = veiculoAtualizado.Modelo;
    veiculo.AnoFabricacao = veiculoAtualizado.AnoFabricacao;
    veiculo.Cor = veiculoAtualizado.Cor;
    veiculo.Combustivel = veiculoAtualizado.Combustivel;
    veiculo.Quilometragem = veiculoAtualizado.Quilometragem;
    veiculo.Observacoes = veiculoAtualizado.Observacoes;
    veiculo.ClienteId = veiculoAtualizado.ClienteId;

    _context.SaveChanges();

    return Ok(veiculo);
}

// DELETE - excluir veiculo
[HttpDelete("{id}")]
public IActionResult Delete(int id)
{
    var veiculo = _context.Veiculos.Find(id);

    if (veiculo == null)
        return NotFound();

    _context.Veiculos.Remove(veiculo);
    _context.SaveChanges();

    return Ok(veiculo);
}

}