namespace OnlyConnect.App;

public class Connections
{
    public IConnection<string> TwoReeds { get; set; }
    public IConnection<string> Lion { get; set; }
    public IConnection<string> TwistedFlax { get; set; }
    public IConnection<string> HornedViper { get; set; }
    public IConnection<string> Water { get; set; }
    public IConnection<string> EyeOfHorus { get; set; }
}


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