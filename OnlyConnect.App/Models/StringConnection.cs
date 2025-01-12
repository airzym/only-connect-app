namespace OnlyConnect.App.Models;

public interface IConnection<T>
{
    T ClueOne { get; }
    T ClueTwo { get; }
    T ClueThree { get; }
    T ClueFour { get; }
    string Answer { get; }
    bool Selected { get; set; }
}

public class StringConnection : IConnection<string>
{
    public required string ClueOne { get; set; }
    public required string ClueTwo { get; set; }
    public required string ClueThree { get; set; }
    public required string ClueFour { get; set; }
    public required string Answer { get; set; }
    public bool Selected { get; set; } = false;
}