using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Tulos
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Nimi { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string PituusL { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string PituusA { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string PituusB { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string KuormaTV { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string KuormaPK { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string KuormaPM { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string ForceType { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string MaxM { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string MaxV { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string DateOfJoining { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string PhotoFileName { get; set; }
    }
}
