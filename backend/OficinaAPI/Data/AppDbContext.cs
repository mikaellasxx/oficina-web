using Microsoft.EntityFrameworkCore;
using OficinaAPI.Models;

namespace OficinaAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

public DbSet<Cliente> Clientes { get; set; }
public DbSet<Veiculo> Veiculos { get; set; }
public DbSet<Fornecedor> Fornecedores { get; set; }
public DbSet<Funcionario> Funcionarios { get; set; }
public DbSet<OrdemServico> OrdensServico { get; set; }
public DbSet<Peca> Pecas { get; set; }
public DbSet<Servico> Servicos { get; set; }
public DbSet<OrdemServicoItem> OrdensServicoItens { get; set; }
}