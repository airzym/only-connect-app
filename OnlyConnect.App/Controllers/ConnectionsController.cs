using Microsoft.AspNetCore.Mvc;

namespace OnlyConnect.App.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConnectionsController : ControllerBase
{
    private readonly Connections _connections = new()
    {
        EyeOfHorus = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", Selected = false, },
        HornedViper = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", Selected = true, },
        Lion = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", Selected = false, },
        TwistedFlax = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", Selected = true, },
        TwoReeds = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", Selected = false, },
        Water = new StringConnection { Answer = "The Answer", ClueOne = "One", ClueTwo = "Two", ClueThree = "Three", ClueFour = "Four", Selected = false, },
    };
    
    [HttpGet]
    public Connections Get()
    {
        return _connections;
    }
    
    [HttpGet("[action]")]
    public IConnection<string> EyeOfHorus()
    {
        return _connections.EyeOfHorus;
    }
    
    [HttpGet("[action]")]
    public IConnection<string> HornedViper()
    {
        return _connections.HornedViper;
    }
    
    [HttpGet("[action]")]
    public IConnection<string> Lion()
    {
        return _connections.Lion;
    }
    
    [HttpGet("[action]")]
    public IConnection<string> TwistedFlax()
    {
        return _connections.TwistedFlax;
    }
    
    [HttpGet("[action]")]
    public IConnection<string> TwoReeds()
    {
        return _connections.TwoReeds;
    }
    
    [HttpGet("[action]")]
    public IConnection<string> Water()
    {
        return _connections.Water;
    }
}