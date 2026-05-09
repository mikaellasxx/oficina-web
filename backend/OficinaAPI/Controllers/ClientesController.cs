using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OficinaAPI.Data;
using OficinaAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClientesController(AppDbContext context)
    {
        _context = context;
    }

    // GET - listar todos
    [HttpGet]
    public IActionResult Get()
    {
        var clientes = _context.Clientes
    .Include(c => c.Veiculos)
    .ToList();
        return Ok(clientes);
    }

    // GET por ID
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var cliente = _context.Clientes.Find(id);

        if (cliente == null)
            return NotFound();

        return Ok(cliente);
    }

    // POST - criar cliente
    [HttpPost]
    public IActionResult Post([FromBody] Cliente cliente)
    {
        _context.Clientes.Add(cliente);
        _context.SaveChanges();

        return Ok(cliente);
    }

    // PUT - atualizar cliente
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Cliente clienteAtualizado)
    {
        var cliente = _context.Clientes.Find(id);

        if (cliente == null)
            return NotFound();

        cliente.Nome = clienteAtualizado.Nome;
        cliente.Telefone = clienteAtualizado.Telefone;
        cliente.Documento = clienteAtualizado.Documento;
        cliente.Email = clienteAtualizado.Email;
        cliente.Endereco = clienteAtualizado.Endereco;

        _context.SaveChanges();

        return Ok(cliente);
    }

    // DELETE - remover cliente
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var cliente = _context.Clientes.Find(id);

        if (cliente == null)
            return NotFound();

        _context.Clientes.Remove(cliente);
        _context.SaveChanges();

        return Ok();
    }
}