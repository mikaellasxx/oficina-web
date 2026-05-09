using Microsoft.AspNetCore.Mvc;
using OficinaAPI.Data;
using OficinaAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class FornecedoresController : ControllerBase
{
    private readonly AppDbContext _context;

    public FornecedoresController(AppDbContext context)
    {
        _context = context;
    }

// GET - listar todos
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Fornecedores.ToList());
    }

// GET por ID
    [HttpGet("{id}")]
    public IActionResult GetById(int id)    
    {
        var fornecedor = _context.Fornecedores.Find(id);

        if (fornecedor == null)
            return NotFound();

        return Ok(fornecedor);
    }

// POST - criar fornecedor
    [HttpPost]
    public IActionResult Post([FromBody] Fornecedor fornecedor)
    {
        _context.Fornecedores.Add(fornecedor);
        _context.SaveChanges();

        return Ok(fornecedor);
    }

// PUT - atualizar fornecedor
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Fornecedor fornecedorAtualizado)
    {
        var fornecedor = _context.Fornecedores.Find(id);

        if (fornecedor == null)
            return NotFound();

        fornecedor.Nome = fornecedorAtualizado.Nome;
        fornecedor.Telefone = fornecedorAtualizado.Telefone;
        fornecedor.Documento = fornecedorAtualizado.Documento;
        fornecedor.Email = fornecedorAtualizado.Email;
        fornecedor.Endereco = fornecedorAtualizado.Endereco;

        _context.SaveChanges();

        return Ok(fornecedor);
    }    

// DELETE - remover fornecedor
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var fornecedor = _context.Fornecedores.Find(id);

        if (fornecedor == null)
            return NotFound();

        _context.Fornecedores.Remove(fornecedor);
        _context.SaveChanges();

        return NoContent();
    }    
}