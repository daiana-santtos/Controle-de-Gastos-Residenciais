using Microsoft.EntityFrameworkCore;
using ControleGastos.Api.Data;
using ControleGastos.Api.Services;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// =========================
// Configuração dos serviços
// =========================

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

builder.Services.AddScoped<PessoaService>();
builder.Services.AddScoped<TransacaoService>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("React",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// =========================
// Construção da aplicação
// =========================

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.MapScalarApiReference(options =>
    {
        options.WithTitle("Controle de Gastos Residenciais")
               .WithTheme(ScalarTheme.Purple) 
               .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
    });
}

// =========================
// Middleware e pipeline HTTP
// =========================

app.UseHttpsRedirection();
app.UseCors("React");
app.UseAuthorization();
app.MapControllers();
app.Run();