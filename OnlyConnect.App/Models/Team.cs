namespace OnlyConnect.App.Models;

public record Team(string TeamName)
{
    public Guid TeamId { get; set; } = Guid.NewGuid();
    public string TeamName { get; set; } = TeamName;
    public bool CurrentTurn { get; set; }
}