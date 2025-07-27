//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();

//app.MapControllers();

//app.Run();


using Microsoft.EntityFrameworkCore;
using ShoppingAPI.Data;
using ShoppingAPI.Models;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:7000", "https://localhost:7001");

// Add services
builder.Services.AddControllers();
builder.Services.AddDbContext<ShoppingDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure pipeline
app.UseCors();
app.UseRouting();
app.MapControllers();
app.UseStaticFiles();

// Seed data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ShoppingDBContext>();
    context.Database.EnsureCreated();
    SeedData(context);
}

app.Run();

static void SeedData(ShoppingDBContext context)
{
    if (!context.Categories.Any())
    {
        var categories = new List<Category>
        {
            new Category { Id = 1, Name = "����� ������" },
            new Category { Id = 2, Name = "����� ���" },
            new Category { Id = 3, Name = "��� �����" }
        };
        context.Categories.AddRange(categories);

        var products = new List<Product>
        {
            // ����� ������
            new Product { Id = 1, Name = "������", Price = 12.50m, CategoryId = 1 },
            new Product { Id = 2, Name = "�����", Price = 8.90m, CategoryId = 1 },
            new Product { Id = 3, Name = "�������", Price = 6.50m, CategoryId = 1 },
            
            // ����� ���  
            new Product { Id = 4, Name = "��� 3%", Price = 5.20m, CategoryId = 2 },
            new Product { Id = 5, Name = "������", Price = 4.80m, CategoryId = 2 },
            new Product { Id = 6, Name = "����� �����", Price = 28.90m, CategoryId = 2 },
            
            // ��� �����
            new Product { Id = 7, Name = "��� ���", Price = 32.90m, CategoryId = 3 },
            new Product { Id = 8, Name = "�����", Price = 89.90m, CategoryId = 3 },
        };
        context.Products.AddRange(products);
        context.SaveChanges();
    }
}