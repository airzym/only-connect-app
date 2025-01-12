namespace OnlyConnect.App.Models;

public record Game
{
    public Team TeamOne { get; }
    public Team TeamTwo { get; }
    
    public Team CurrentTeam => TeamOne.CurrentTurn ? TeamOne : TeamTwo;
    
    public IEnumerable<IConnection> Connections { get; set; } = new List<IConnection>
    {
        new StringConnection { Name = "eyeOfHorus", Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        new StringConnection { Name = "hornedViper", Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        new StringConnection { Name = "lion", Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        new StringConnection { Name = "twistedFlax", Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        new StringConnection { Name = "twoReeds", Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", }, 
        new StringConnection { Name = "water", Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
    };

    public Game(Team teamOne, Team teamTwo)
    {
        TeamOne = teamOne;
        TeamTwo = teamTwo;
    }

    public void SetCurrentTeam(Guid teamId)
    {
        if (teamId == TeamOne.TeamId)
        {
            TeamOne.CurrentTurn = true;
            TeamTwo.CurrentTurn = false;
        }
        else
        {
            TeamOne.CurrentTurn = false;
            TeamTwo.CurrentTurn = true;
        }
    }
}