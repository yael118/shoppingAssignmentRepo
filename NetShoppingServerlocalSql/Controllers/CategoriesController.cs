using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetShoppingServerlocalSql.Data;

namespace NetShoppingServerlocalSql.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ShoppingContext _context;

        public CategoriesController(ShoppingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Categories
                .Select(c => new { c.Id, c.Name })
                .ToListAsync();

            return Ok(categories);
        }

        [HttpGet("{id}/products")]
        public async Task<IActionResult> GetProductsByCategory(int id)
        {
            var products = await _context.Products
                .Where(p => p.CategoryId == id)
                .Select(p => new { p.Id, p.Name, p.Price })
                .ToListAsync();

            return Ok(products);
        }
    }
}