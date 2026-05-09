using Microsoft.AspNetCore.Mvc;
using OficinaAPI.Data;
using OficinaAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class ServicosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ServicosController(AppDbContext context)
    {
        _context = context;
    }

// GET - listar todos
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Servicos.ToList());
    }

// GET por ID
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var servico = _context.Servicos.Find(id);

        if (servico == null)
            return NotFound();

        return Ok(servico);
    }

// POST - criar servico
    [HttpPost]
    public IActionResult Post([FromBody] Servico servico)
    {
        _context.Servicos.Add(servico);
        _context.SaveChanges();

        return Ok(servico);
    }

// PUT - atualizar servico
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Servico servicoAtualizado)
    {
        var servico = _context.Servicos.Find(id);

        if (servico == null)
            return NotFound();

        servico.Nome = servicoAtualizado.Nome;
        servico.Preco = servicoAtualizado.Preco;

        _context.SaveChanges();

        return Ok(servico);
    }

// DELETE - excluir servico
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var servico = _context.Servicos.Find(id);

        if (servico == null)
            return NotFound();

        _context.Servicos.Remove(servico);
        _context.SaveChanges();

        return NoContent();
    }
}