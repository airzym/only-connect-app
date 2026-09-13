namespace OnlyConnect.App.Models;

public interface IConnection
{
    string Name { get; set; }
    string ClueOne { get; }
    string ClueTwo { get; }
    string ClueThree { get; }
    string ClueFour { get; }
    string Answer { get; }
    public Winner? Winner { get; set; }
    public void SetWinner(Winner winner)
    {
        Winner = winner;
    }
}

public record Winner
{
    public Guid? WinningTeamId { get; set; }
    public int PointsWon { get; set; }
}

public record StringConnection : IConnection
{
    public required string Name { get; set; }
    public required string ClueOne { get; set; }
    public required string ClueTwo { get; set; }
    public required string ClueThree { get; set; }
    public required string ClueFour { get; set; }
    public required string Answer { get; set; }
    public Winner? Winner { get; set; }
    
}