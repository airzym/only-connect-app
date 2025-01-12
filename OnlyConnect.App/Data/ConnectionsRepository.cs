using OnlyConnect.App.Models;

namespace OnlyConnect.App.Data;

public interface IConnectionsRepository
{
    Connections Get();
    IConnection<string> EyeOfHorus();
    IConnection<string> HornedViper();
    IConnection<string> Lion();
    IConnection<string> TwistedFlax();
    IConnection<string> TwoReeds();
    IConnection<string> Water();
}

public class ConnectionsRepository : IConnectionsRepository
{
    private static readonly Connections Connections = new()
    {
        EyeOfHorus = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        HornedViper = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        Lion = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        TwistedFlax = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        TwoReeds = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
        Water = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", },
    };


    public Connections Get()
    {
        return Connections;
    }

    public IConnection<string> EyeOfHorus()
    {
        Connections.EyeOfHorus.Selected = true;
        return Connections.EyeOfHorus;
    }

    public IConnection<string> HornedViper()
    {
        Connections.HornedViper.Selected = true;
        return Connections.HornedViper;
    }

    public IConnection<string> Lion()
    {
        Connections.Lion.Selected = true;
        return Connections.Lion;
    }

    public IConnection<string> TwistedFlax()
    {
        Connections.TwistedFlax.Selected = true;
        return Connections.TwistedFlax;
    }

    public IConnection<string> TwoReeds()
    {
        Connections.TwoReeds.Selected = true;
        return Connections.TwoReeds;
    }

    public IConnection<string> Water()
    {
        Connections.Water.Selected = true;
        return Connections.Water;
    }
}