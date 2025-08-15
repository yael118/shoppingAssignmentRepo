using NetShoppingServerlocalSql.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetShoppingServerlocalSql.Models
{
    [Table("products")]
    public class Product
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        [MaxLength(255)]
        public string? Name { get; set; }

        [Column("price", TypeName = "decimal(10,2)")]
        public decimal? Price { get; set; }

        [Column("categoryid")]
        public int? CategoryId { get; set; }

        // Navigation property  
        [ForeignKey("CategoryId")]
        public virtual Category? Category { get; set; }
    }
}
