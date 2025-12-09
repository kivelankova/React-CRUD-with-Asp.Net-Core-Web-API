using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class BarDBContext:DbContext
    {
        public BarDBContext(DbContextOptions<BarDBContext> options):base(options)
        {

        }

        public DbSet<KuormaTyyppi> KuormaTyypit { get; set; }
        public DbSet<Tulos> Tulokset { get; set; }

    }
}
