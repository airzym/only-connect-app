namespace OnlyConnect.App.Models;

public record Game
{
    public Team TeamOne { get; }
    public Team TeamTwo { get; }
    
    public Team CurrentTeam => TeamOne.CurrentTurn ? TeamOne : TeamTwo;
    
    public Connections Connections { get; set; } = new()
    {
        EyeOfHorus = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        HornedViper = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        Lion = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        TwistedFlax = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        TwoReeds = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        Water = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
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