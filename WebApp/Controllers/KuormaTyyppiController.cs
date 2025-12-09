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
    public class KuormaTyyppiController : ControllerBase
    {
        private readonly BarDBContext _context;

        public KuormaTyyppiController(BarDBContext context)
        {
            _context = context;
        }

        // GET: api/KuormaTyyppi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KuormaTyyppi>>> GetKuormatyypit()
        {
            return await _context.KuormaTyypit.ToListAsync();
        }

        // GET: api/KuormaTyyppi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<KuormaTyyppi>> GetKuormaTyyppi(int id)
        {
            var kuormaTyyppi = await _context.KuormaTyypit.FindAsync(id);

            if (kuormaTyyppi == null)
            {
                return NotFound();
            }

            return kuormaTyyppi;
        }

        // PUT: api/KuormaTyyppi/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKuormaTyyppi(int id, KuormaTyyppi kuormaTyyppi)
        {
            // if (id != kuormaTyyppi.Id)
            // {
            //     return BadRequest();
            // }

            kuormaTyyppi.Id = id;

            _context.Entry(kuormaTyyppi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KuormaTyyppiExists(id))
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

        // POST: api/KuormaTyyppi
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<KuormaTyyppi>> PostKuormaTyyppi(KuormaTyyppi kuormaTyyppi)
        {
            _context.KuormaTyypit.Add(kuormaTyyppi);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKuormaTyyppi", new { id = kuormaTyyppi.Id }, kuormaTyyppi);
        }

        // DELETE: api/KuormaTyyppi/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<KuormaTyyppi>> DeleteKuormaTyyppi(int id)
        {
            var kuormaTyyppi = await _context.KuormaTyypit.FindAsync(id);
            if (kuormaTyyppi == null)
            {
                return NotFound();
            }

            _context.KuormaTyypit.Remove(kuormaTyyppi);
            await _context.SaveChangesAsync();

            return kuormaTyyppi;
        }

        private bool KuormaTyyppiExists(int id)
        {
            return _context.KuormaTyypit.Any(e => e.Id == id);
        }
    }
}
