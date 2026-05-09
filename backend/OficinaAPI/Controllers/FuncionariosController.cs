using Microsoft.AspNetCore.Mvc;
using OficinaAPI.Data;
using OficinaAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class FuncionariosController : ControllerBase
{
    private readonly AppDbContext _context;

    public FuncionariosController(AppDbContext context)
    {
        _context = context;
    }

// GET - listar todos
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Funcionarios.ToList());
    }

// GET por ID
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var funcionario = _context.Funcionarios.Find(id);

        if (funcionario == null)
            return NotFound();

        return Ok(funcionario);
    }

// POST - criar funcionario
    [HttpPost]
    public IActionResult Post([FromBody] Funcionario funcionario)
    {
        _context.Funcionarios.Add(funcionario);
        _context.SaveChanges();

        return Ok(funcionario);
    }

// PUT - atualizar funcionario
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Funcionario funcionarioAtualizado)
    {
        var funcionario = _context.Funcionarios.Find(id);

        if (funcionario == null)
            return NotFound();

        funcionario.Nome = funcionarioAtualizado.Nome;
        funcionario.Cargo = funcionarioAtualizado.Cargo;
        funcionario.Telefone = funcionarioAtualizado.Telefone;
        funcionario.Email = funcionarioAtualizado.Email;
        funcionario.Endereco = funcionarioAtualizado.Endereco;

        _context.SaveChanges();

        return Ok(funcionario);
    }

// DELETE - excluir funcionario
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var funcionario = _context.Funcionarios.Find(id);

        if (funcionario == null)
            return NotFound();

        _context.Funcionarios.Remove(funcionario);
        _context.SaveChanges();

        return Ok();
    }    
}