using Microsoft.AspNetCore.Mvc;
using OficinaAPI.Data;
using OficinaAPI.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PecasController : ControllerBase
{
    private readonly AppDbContext _context;

    public PecasController(AppDbContext context)
    {
        _context = context;
    }

// GET - listar todos
    [HttpGet]
    public IActionResult Get()
{
    var pecas = _context.Pecas
        .Include(p => p.Fornecedor)
        .ToList();
       

    return Ok(pecas);
}

// GET por ID
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var peca = _context.Pecas.Find(id);

        if (peca == null)
            return NotFound();

        return Ok(peca);
    }
    
// POST - criar peça
    [HttpPost]
    public IActionResult Post([FromBody] Peca peca)
    {
        _context.Pecas.Add(peca);
        _context.SaveChanges();

        return Ok(peca);
    }

// PUT - atualizar peça
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Peca pecaAtualizada)
    {
        var peca = _context.Pecas.Find(id);

        if (peca == null)
            return NotFound();

        peca.Nome = pecaAtualizada.Nome;
        peca.Preco = pecaAtualizada.Preco;
        peca.Quantidade = pecaAtualizada.Quantidade;
        peca.FornecedorId = pecaAtualizada.FornecedorId;

        _context.SaveChanges();

        return Ok(peca);
    }

// DELETE - excluir peça
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var peca = _context.Pecas.Find(id);

        if (peca == null)
            return NotFound();

        _context.Pecas.Remove(peca);
        _context.SaveChanges();

        return NoContent();
    }    
}