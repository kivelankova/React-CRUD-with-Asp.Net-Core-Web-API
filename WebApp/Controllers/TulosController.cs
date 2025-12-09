using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TulosController : ControllerBase
    {
        private readonly BarDBContext _context;

        public TulosController(BarDBContext context)
        {
            _context = context;
        }

        // GET: api/Tulos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tulos>>> GetTulokset()
        {
            return await _context.Tulokset.ToListAsync();
        }

        // GET: api/Tulos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tulos>> GetTulos(int id)
        {
            var tulos = await _context.Tulokset.FindAsync(id);

            if (tulos == null)
            {
                return NotFound();
            }

            return tulos;
        }

        // PUT: api/Tulos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTulos(int id, Tulos tulos)
        {
            tulos.Id = id;

            _context.Entry(tulos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TulosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tulos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Tulos>> PostTulos(Tulos tulos)
        {
            _context.Tulokset.Add(tulos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTulos", new { id = tulos.Id }, tulos);
        }

        // DELETE: api/Tulos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tulos>> DeleteTulos(int id)
        {
            var tulos = await _context.Tulokset.FindAsync(id);
            if (tulos == null)
            {
                return NotFound();
            }

            _context.Tulokset.Remove(tulos);
            await _context.SaveChangesAsync();

            return tulos;
        }

        private bool TulosExists(int id)
        {
            return _context.Tulokset.Any(e => e.Id == id);
        }
    }
}
