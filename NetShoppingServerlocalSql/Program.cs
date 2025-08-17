using Microsoft.EntityFrameworkCore;
using NetShoppingServerlocalSql.Data;
using NetShoppingServerlocalSql.Models;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:7000", "https://localhost:7001");
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
///
builder.Services.AddDbContext<ShoppingContext>(options =>
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
// הגדרת CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
     .AllowCredentials()); 
});

var app = builder.Build();
app.UseCors("AllowReactDev");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ShoppingContext>();
    context.Database.EnsureCreated();
    SeedData(context);
}

app.Run();

static void SeedData(ShoppingContext context)
{
    if (!context.Categories.Any())
    {
        var categories = new List<Category>
        {
            new Category { Id = 1, Name = "פירות וירקות" },
            new Category { Id = 2, Name = "מוצרי חלב" },
            new Category { Id = 3, Name = "בשר ודגים" }
        };
        context.Categories.AddRange(categories);

        var products = new List<Product>
        {
            // פירות וירקות
            new Product { Id = 1, Name = "תפוחים", Price = 12.50m, CategoryId = 1 },
            new Product { Id = 2, Name = "בננות", Price = 8.90m, CategoryId = 1 },
            new Product { Id = 3, Name = "עגבניות", Price = 6.50m, CategoryId = 1 },
            
            // מוצרי חלב  
            new Product { Id = 4, Name = "חלב 3%", Price = 5.20m, CategoryId = 2 },
            new Product { Id = 5, Name = "יוגורט", Price = 4.80m, CategoryId = 2 },
            new Product { Id = 6, Name = "גבינה צהובה", Price = 28.90m, CategoryId = 2 },
            
            // בשר ודגים
            new Product { Id = 7, Name = "חזה עוף", Price = 32.90m, CategoryId = 3 },
            new Product { Id = 8, Name = "סלמון", Price = 89.90m, CategoryId = 3 },
        };
        context.Products.AddRange(products);
        context.SaveChanges();
    }
}