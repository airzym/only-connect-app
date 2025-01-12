namespace OnlyConnect.App.Models;

public interface IConnection
{
    string Name { get; set; }
    string ClueOne { get; }
    string ClueTwo { get; }
    string ClueThree { get; }
    string ClueFour { get; }
    string Answer { get; }
    bool Selected { get; set; }
}

public class StringConnection : IConnection
{
    public required string Name { get; set; }
    public required string ClueOne { get; set; }
    public required string ClueTwo { get; set; }
    public required string ClueThree { get; set; }
    public required string ClueFour { get; set; }
    public required string Answer { get; set; }
    public bool Selected { get; set; } = false;
}