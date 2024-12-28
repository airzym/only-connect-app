using Microsoft.AspNetCore.Mvc;
using OnlyConnect.App.Data;

namespace OnlyConnect.App.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConnectionsController : ControllerBase
{
    private readonly IConnectionsRepository _connectionsRepository;

    public ConnectionsController(IConnectionsRepository connectionsRepository)
    {
        _connectionsRepository = connectionsRepository;
    }
    
    [HttpGet]
    public Connections Get()
    {
        return _connectionsRepository.Get();
    }
    
    [HttpGet("[action]")]
    public IConnection<string> EyeOfHorus()
    {
        return _connectionsRepository.EyeOfHorus();
    }
    
    [HttpGet("[action]")]
    public IConnection<string> HornedViper()
    {
        return _connectionsRepository.HornedViper();
    }
    
    [HttpGet("[action]")]
    public IConnection<string> Lion()
    {
        return _connectionsRepository.Lion();
    }
    
    [HttpGet("[action]")]
    public IConnection<string> TwistedFlax()
    {
        return _connectionsRepository.TwistedFlax();
    }
    
    [HttpGet("[action]")]
    public IConnection<string> TwoReeds()
    {
        return _connectionsRepository.TwoReeds();
    }
    
    [HttpGet("[action]")]
    public IConnection<string> Water()
    {
        return _connectionsRepository.Water();
    }
}